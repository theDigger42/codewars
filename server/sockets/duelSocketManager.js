const ioDuel = require("../index").ioDuel;
const ToyProblem = require("../database/index").ToyProblem;
const patchUser = require("../database/index").patchUser;
const getUser = require("../database/index").getUser;
const updateWins = require("../database/index").updateWins;
const updateRating = require("../database/index").updateRating;
const EloRank = require("../helpers/ranking");
const Promise = require('bluebird');

const elo = new EloRank();

let waitingRoom = {};
let duelRoom = {};
let roomId = `room${Math.random()}`

let ratingChange = (roomArray) => {
  let playerA, playerB
  roomArray.forEach(player => {
    if (player.won) playerA = player
    else playerB = player
  })
  let expectedScoreA = elo.getExpected(playerA.rating, playerB.rating);
  let expectedScoreB = elo.getExpected(playerB.rating, playerA.rating);
  ratingA = elo.updateRating(expectedScoreA, 1, playerA.rating);
  ratingB = elo.updateRating(expectedScoreB, 0, playerB.rating);
  let newPlayerA = Object.assign({}, playerA);
  let newPlayerB = Object.assign({}, playerB);
  newPlayerA.rating = ratingA - playerA.rating;
  newPlayerB.rating = ratingB - playerB.rating;
  updateRating(newPlayerA, newPlayerB);
};

let comparePlayers = (roomArray) => {
  let playerA, playerB
  roomArray.forEach(player => {
    if (player.won) playerA = player
    else playerB = player
  })
  let expectedScoreA = elo.getExpected(playerA.rating, playerB.rating);
  let expectedScoreB = elo.getExpected(playerB.rating, playerA.rating);
  ratingA = elo.updateRating(expectedScoreA, 1, playerA.rating);
  ratingB = elo.updateRating(expectedScoreB, 0, playerB.rating);
  patchUser(playerA.username, ratingA);
  patchUser(playerB.username, ratingB);
};

module.exports.ioDuel = socket => {
  let _user = null;
  let currentRoom = null

  socket.emit('currentRoom', roomId);

  socket.on("joinDuelRoom", async ({user}) => {
    currentRoom = roomId
    socket.join(currentRoom)
    _user = await getUser(user.username);
    if (!waitingRoom[_user.username]) waitingRoom[_user.username] = user
    if (Object.keys(waitingRoom).length === 2) {
      duelRoom[currentRoom] = Object.keys(waitingRoom).map(i => waitingRoom[i])
      console.log(duelRoom[currentRoom]);
      startDuel(currentRoom)
      roomId = `room${Math.random()}`
    }
  });

  socket.on("duelComplete", () => {
    duelRoom[currentRoom].forEach(user => {
      if (user.username === _user.username) {
        user.won = true;
      } else {
        user.won = false;
      }
    })
    ratingChange(duelRoom[currentRoom])
    comparePlayers(duelRoom[currentRoom])
    delete duelRoom[currentRoom]
  });

  socket.on('duelTyping', (letter) => {
    socket.in(currentRoom).broadcast.emit('playerTyping', letter)
  })

  socket.on('userResponse', (response) => {
    socket.in(currentRoom).broadcast.emit('opponentResults', response)
  })

  socket.on('resetOpponentConsole', () => {
    socket.in(currentRoom).broadcast.emit('clearOpponentConsole');
  })

  socket.on('resetOpponentPrompt', () => {
    socket.in(currentRoom).broadcast.emit('clearOpponentPrompt');
  })

};

let startDuel = (id) => {
  ioDuel.in(id).emit('duelers', Object.values(waitingRoom));
  ToyProblem.countDocuments().exec((err, count) => {
    var random = Math.floor(Math.random() * count);
    ToyProblem.findOne()
      .skip(random)
      .exec((err, result) => {
        ioDuel.in(id).emit("challenge", result);
      });
  });
  waitingRoom = {};
}