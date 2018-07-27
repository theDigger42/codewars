
const express = require('express');
const http = require('http');
const socket = require('socket.io');

const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();
const server = http.Server(app);
const io = socket(server);

// Setup middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(__dirname + '/../client/dist'));

app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('port', (process.env.PORT || 3000));


//Here are the routes we use
require('./routes.js').passportRoutes(app, passport);
require('./routes.js').challengeRoutes(app);
require('./routes.js').databaseRoutes(app);

let connections = [];
let waitingRoom = {};
let gameRoom = {};
let scoreboard = [];
/*
{
  username: 'will',
  finished: false,
  finishTime: null,
  finishPlace: null
}

*/
// socket.io
io.on('connection', (client) => {
  console.log('socket connected');
  
  client.on('message', (data) => {
    console.log('message', data);
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
    console.log('client disconnected');
  })

  client.emit('message', 'connected!')
});

// begin timer
const ioTimer = io.of('/timer');

ioTimer.on('connection', (interval) => {
  console.log('ioTimer connected');
  interval.on('getDate', () => {
    interval.emit('date', new Date())
  })
})


server.listen(app.get('port'), function() {
  console.log('Server started on port:' + app.get('port'));
});
// end timer

module.exports = app;

const ioGame = io.of('/game');

// onclient side we need to do this whenever they enter waiting room
ioGame.on('connection', (socket) => {
  console.log('game socket connected');

  let _username = null;

  socket.on('joinWaitingRoom', ({ username }) => {
    _username = username;
    console.log('joinWaitingRoom', username);
    waitingRoom[username] = { 
      socket,
      finished: false,
      finishTime: null,
      finishPlace: null
    };
    console.log('user added to waiting room', waitingRoom);
  })
  /// everything we only want to send to this person or listen to form this person here
  const removeFromWaitingRoom = () => delete waitingRoom[_username];

  socket.on('exitWaitingRoom', removeFromWaitingRoom); 
  socket.on('disconnect', removeFromWaitingRoom);

  socket.on('gameComplete', () => {
    console.log('gameComplete', _username)
    console.log('scoreboard on game complete', scoreboard);
    // if it is good call scoreboardchanged with the result
    scoreboardChange(_username);
  })
})

/*




*/
const scoreboardChange = (user) => {
  if (user !== undefined) {
    scoreboard.push(user)
  }
  const unfinishedUsers = Object.keys(gameRoom).length - scoreboard.length;
  const clientScoreboard = [...scoreboard];
  for (let i = 0; i < unfinishedUsers; i++) {
    clientScoreboard.push('unfinished');
  }
  console.log('emiting scoreboardChange', clientScoreboard);
  ioGame.emit('scoreboardChange', clientScoreboard);
}


const startGame = () => {
  // move waiting room to gameroom 
  // reset
  console.log('starting a new game startgame timer thing'); 
  gameRoom = Object.assign({}, waitingRoom)
  scoreboard = [];
  waitingRoom = {};
  // setTimeout(handleGameEnd, secondsTillNextGame() - 30) // send results one last time
  scoreboardChange();
  setTimeout(startGame, secondsTillNextGame());
}

const secondsTillNextGame = () => 1000 * (60 - (new Date().getSeconds()));

setTimeout(startGame, secondsTillNextGame);

// update specific user on if their test passed

