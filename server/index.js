
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
const patchUser = require('../database/index').patchUser
const getUser = require('../database/index').getUser
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
  let expectedScoreA = elo.getExpected(playerA.rating, playerB.rating)
  let expectedScoreB = elo.getExpected(playerB.rating, playerA.rating)
  ratingA = elo.updateRating(expectedScoreA, 1, playerA.rating)
  ratingB = elo.updateRating(expectedScoreB, 0, playerB.rating)
  patchUser(playerA.username, ratingA)
  patchUser(playerB.username, ratingB)
}

let compareUnfinished = (playerA, playerB) => {
  let expectedScoreA = elo.getExpected(playerA.rating, playerB.rating)
  let expectedScoreB = elo.getExpected(playerB.rating, playerA.rating)
  ratingA = elo.updateRating(expectedScoreA, 1, playerA.rating)
  ratingB = elo.updateRating(expectedScoreB, 0, playerB.rating)
  patchUser(playerB.username, ratingB)
}

const retrieveUsers = (array) => {
  return new Promise(async (resolve) => {
    let ret = []
    for (let i = 0; i < array.length; i++) {
      let data = await getUser(array[i].username)
      ret.push(data)
    }
    resolve(ret)
  })
}

const rankFinishers = async () => {
  let unfinishedUsers = getUnfinished(gameRoom)
  let finished
  let unfinished
  finished = await retrieveUsers(scoreboard)
  unfinished = await retrieveUsers(unfinishedUsers)

  if (finished.length >= 2) {
    for (let i = 0; i < finished.length - 1; i++) {
      comparePlayers(finished[i], finished[i+1])
    }
  }
  if (finished.length >= 1 && unfinished.length > 1) {
    for (let i = 0; i < unfinished.length; i++) {
      compareUnfinished(finished[finished.length-1], unfinished[i])
    }
  }
  if (finished.length === 1 && unfinished.length === 1) {
    for (let i = 0; i < unfinished.length; i++) {
      comparePlayers(finished[finished.length-1], unfinished[i])
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
  let _user = null
  socket.on('joinWaitingRoom', async (user) => {
    _user = await getUser(user.username)
    waitingUsers.push(_user)
    waitingRoom[_user] = {
      socket
    };
  })

  const removeFromWaitingRoom = (user) => delete waitingRoom[user];

  socket.on('exitWaitingRoom', removeFromWaitingRoom);
  socket.on('disconnect', removeFromWaitingRoom);

  socket.on('gameComplete', () => {
    _user.finished = true
    scoreboardChange(_user);
  })
})

const scoreboardChange = (user) => {
  if (user && user.finished) {
    scoreboard.push(user)
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

const startGame = () => {
  rankFinishers()
  setTimeout(() => {
    gameRoom = waitingUsers;
    scoreboard = [];
    waitingUsers = [];
    waitingRoom = {};
    ToyProblem.count().exec(function (err, count) {
      var random = Math.floor(Math.random() * count);
      ToyProblem.findOne().skip(random).exec(function (err, result) {
        ioGame.emit('challenge', result)
      });
    });
    setTimeout(startGame, secondsTillNextGame());
    scoreboardChange();
  }, 1000)
}

const secondsTillNextGame = () => 1000 * (60 - (new Date().getSeconds()));

setTimeout(startGame, secondsTillNextGame);