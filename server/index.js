
const express = require('express');
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
let gameRoom = {};
let scoreboard = [];

const rankFinishers = (scoreboard) => {
  if (scoreboard.length >= 2) {
    for (let i = 0; i < scoreboard.length - 1; i++) {
      let playerA = scoreboard[i].rating
      let playerB = scoreboard[i+1].rating
      let expectedScoreA = elo.getExpected(playerA, playerB)
      let expectedScoreB = elo.getExpected(playerB, playerA)
      playerA = elo.updateRating(expectedScoreA, 1, playerA)
      playerB = elo.updateRating(expectedScoreB, 0, playerB)
      User.updateOne({ "username": scoreboard[i].username }, { $set: { "rating": playerA } }, function (err, result) {
        if (err) console.log(err);
      });
      User.updateOne({ "username": scoreboard[i+1].username }, { $set: { "rating": playerB } }, function (err, result) {
        if (err) console.log(err);
      });
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
    console.log('new subscriber', data);
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
    waitingRoom[user] = {
      socket,
      finished: false,
      finishTime: null,
      finishPlace: null
    };
  })

  socket.on('gameInit', () => {
    ToyProblem.count().exec(function (err, count) {
      var random = Math.floor(Math.random() * count);
      ToyProblem.findOne().skip(random).exec(function (err, result) {
        randomChallenge(result)
      });
    });
  })

  const randomChallenge = (problem) => {
    ioGame.emit('challenge', problem)
  }

  /// everything we only want to send to this person or listen to form this person here
  const removeFromWaitingRoom = (user) => delete waitingRoom[user];

  socket.on('exitWaitingRoom', removeFromWaitingRoom);
  socket.on('disconnect', removeFromWaitingRoom);

  socket.on('gameComplete', () => {
    // if it is good call scoreboardchanged with the result
    scoreboardChange(_user);
  })
})

const scoreboardChange = (user) => {
  if (user !== undefined) {
    scoreboard.push(user)
  }
  const unfinishedUsers = Object.keys(gameRoom).length - scoreboard.length;
  const clientScoreboard = [...scoreboard];
  for (let i = 0; i < unfinishedUsers; i++) {
    clientScoreboard.push('unfinished');
  }
  ioGame.emit('scoreboardChange', clientScoreboard);
}

const startGame = () => {
  ioGame.emit('gameStart')
  rankFinishers(scoreboard)
  gameRoom = Object.assign({}, waitingRoom)
  scoreboard = [];
  waitingRoom = {};
  //setTimeout(handleGameEnd, secondsTillNextGame() - 30) // send results one last time
  scoreboardChange();
  setTimeout(startGame, secondsTillNextGame());
}

const secondsTillNextGame = () => 1000 * (60 - (new Date().getSeconds()));

setTimeout(startGame, secondsTillNextGame);