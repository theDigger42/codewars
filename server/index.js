
const express = require('express');
const compression = require('compression')
const http = require('http');
const socket = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')
const auth = require('./routes/auth')
const signup = require('./routes/signup')
const challengeRoutes = require('./routes/challenge')
const databaseRoutes = require('./routes/database')
const ToyProblem = require('../database/index').ToyProblem
const User = require('../database/index').User
const EloRank = require('../helpers/ranking')

const app = express();
app.use(compression())
const server = http.Server(app);
const io = socket(server);

const elo = new EloRank()

// Setup middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../build'));
app.use(cors())

app.use('/api/auth', auth)
app.use('/api/signup', signup)
app.use('/', challengeRoutes)
app.use('/', databaseRoutes)

app.set('port', (process.env.PORT || 80));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

let connections = [];
let waitingRoom = {};
let waitingUsers = []
let gameRoom = [];
let scoreboard = [];

let comparePlayers = (playerA, playerB) => {
  console.log(playerA);
  console.log(playerB);
  let expectedScoreA = elo.getExpected(playerA.rating, playerB.rating)
  let expectedScoreB = elo.getExpected(playerB.rating, playerA.rating)
  console.log(expectedScoreA);
  console.log(expectedScoreB);
  ratingA = elo.updateRating(expectedScoreA, 1, playerA.rating)
  ratingB = elo.updateRating(expectedScoreB, 0, playerB.rating)
  console.log(ratingA);
  console.log(ratingB);
  patchUser(playerA.username, ratingA)
  patchUser(playerB.username, ratingB)
}

let compareUnfinished = (playerA, playerB) => {
  console.log(playerA);
  console.log(playerB);
  let expectedScoreA = elo.getExpected(playerA.rating, playerB.rating)
  let expectedScoreB = elo.getExpected(playerB.rating, playerA.rating)
  console.log(expectedScoreA);
  console.log(expectedScoreB);
  ratingA = elo.updateRating(expectedScoreA, 1, playerA.rating)
  ratingB = elo.updateRating(expectedScoreB, 0, playerB.rating)
  console.log(ratingA);
  console.log(ratingB);
  patchUser(playerB.username, ratingB)
}

let patchUser = (username, rating) => {
  User.updateOne({"username": username}, {$set: {"rating": rating}}, (err, res) => {
    if (err) console.log(err)
    console.log(res);
  })
}

const rankFinishers = () => {
  let unfinishedUsers = getUnfinished(gameRoom)
  console.log('unfinished       ' + unfinishedUsers);
  console.log('finished         ' + scoreboard);
  if (scoreboard.length >= 2) {
    for (let i = 0; i < scoreboard.length - 1; i++) {
      comparePlayers(scoreboard[i], scoreboard[i+1])
    }
  }
  if (scoreboard.length >= 1 && unfinishedUsers.length > 1) {
    for (let i = 0; i < unfinishedUsers.length; i++) {
      compareUnfinished(scoreboard[scoreboard.length-1], unfinishedUsers[i])
    }
  }
  if (scoreboard.length === 1 && unfinishedUsers.length === 1) {
    for (let i = 0; i < unfinishedUsers.length; i++) {
      comparePlayers(scoreboard[scoreboard.length-1], unfinishedUsers[i])
    }
  } 
}

// socket.io
io.on('connection', (client) => {
  client.on('message', (data) => {
    for (connection of connections) {
      connection.emit('message', data)
    }
  })

  client.on('subscribeToMessage', (data) => {
    //console.log('new subscriber', data);
  })

  connections.push(client);

  client.on('disconnect', () => {
    connections.splice(connections.indexOf(client), 1);
  })

  client.emit('message', 'connected!')
});

// begin timer
const ioTimer = io.of('/timer');

ioTimer.on('connection', (interval) => {
  interval.on('getDate', () => {
    interval.emit('date', new Date())
  })
})

server.listen(app.get('port'), function () {
  console.log('Server started on port:' + app.get('port'));
});

module.exports = app;

const ioGame = io.of('/game');

ioGame.on('connection', (socket) => {
  let _user = null;
  socket.on('joinWaitingRoom', (user) => {
    _user = user;
    waitingUsers.push(user)
    waitingRoom[user] = {
      socket
    };
  })

  const removeFromWaitingRoom = (user) => delete waitingRoom[user];

  socket.on('exitWaitingRoom', removeFromWaitingRoom);
  socket.on('disconnect', removeFromWaitingRoom);

  socket.on('gameComplete', () => {
    scoreboardChange(_user);
  })
})

const toggleFinished = (user) => {
  user.finished = true
  let index;
  for (let i = 0; i < gameRoom.length; i++) {
    if (gameRoom[i].username === user.username) {
      index = i
    }
  }
  gameRoom.splice(index, 1)
}

const scoreboardChange = (user) => {
  if (user !== undefined) {
    scoreboard.push(user)
    toggleFinished(user)
  }
  const unfinishedUsers = getUnfinished(gameRoom);
  const clientScoreboard = [...scoreboard, ...unfinishedUsers];
  ioGame.emit('scoreboardChange', clientScoreboard);
}

const getUnfinished = (users) => {
  let unfinished = []
  users.forEach((user) => {
    if (user.finished === false) {
      unfinished.push(user)
    }
  })
  return unfinished;
}

const initializeGameRoom = (users) => {
  let userArray = [];
  users.forEach((user) => {
    userArray.push({username: user.username, rating: user.rating, finished: false})
  })
  return userArray
}

const startGame = () => {
  rankFinishers()
  setTimeout(() => {
    gameRoom = initializeGameRoom(waitingUsers);
    scoreboard = [];
    waitingUsers = [];
    waitingRoom = {};
    scoreboardChange();
  }, 1000)
  ToyProblem.count().exec(function (err, count) {
    var random = Math.floor(Math.random() * count);
    ToyProblem.findOne().skip(random).exec(function (err, result) {
      ioGame.emit('challenge', result)
    });
  });
  setTimeout(startGame, secondsTillNextGame());
}

const secondsTillNextGame = () => 1000 * (60 - (new Date().getSeconds()));

setTimeout(startGame, secondsTillNextGame);