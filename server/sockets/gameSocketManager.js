const ioGame = require("../index").ioGame;
const ToyProblem = require("../database/index").ToyProblem;
const patchUser = require("../database/index").patchUser;
const getUser = require("../database/index").getUser;
const updateWins = require("../database/index").updateWins;
const updateRating = require("../database/index").updateRating;
const EloRank = require("../helpers/ranking");
const Promise = require('bluebird');

const elo = new EloRank();

let waitingRoom = {};
let waitingUsers = [];
let gameRoom = [];
let scoreboard = [];

const startGame = async () => {
  rankFinishers();
  setTimeout(async () => {
    await Promise.map(waitingUsers, (user) => {
      return getUser(user.username).then(user => {
        user.finished = false
        return user
      })
    }).then(users => {
      gameRoom = users
    })
    scoreboard = [];
    waitingUsers = [];
    waitingRoom = {};
    ToyProblem.countDocuments().exec(function(err, count) {
      var random = Math.floor(Math.random() * count);
      ToyProblem.findOne()
        .skip(random)
        .exec(function(err, result) {
          ioGame.emit("challenge", result);
        });
    });
    // ToyProblem.findOne({'title': 'Odd Count'}).exec((err, res) => {
    //   if (err) console.log(err)
    //   ioGame.emit('challenge', res)
    // })
    scoreboardChange();
  }, 800)
};

const updateUserInGameRoom = (username) => {
  gameRoom.forEach(user => {
    if (user.username === username) {
      user.finished = true
    }
  });
};

module.exports.ioGame = socket => {
  let _user = null;
  socket.on("joinWaitingRoom", async user => {
    _user = await getUser(user.username);
    if (!waitingRoom[_user.username]) waitingUsers.push(_user);
    waitingRoom[_user.username] = _user
  });

  socket.on("gameComplete", () => {
    if (_user !== null) _user.finished = true;
    updateUserInGameRoom(_user.username)
    scoreboardChange(_user);
  });
};

const scoreboardChange = user => {
  if (user && user.finished) {
    scoreboard.push(user);
  }
  const unfinishedUsers = getUnfinished(gameRoom);
  const clientScoreboard = [...scoreboard, ...unfinishedUsers];
  ioGame.emit("scoreboardChange", clientScoreboard);
};

const getUnfinished = users => {
  let unfinished = [];
  users.forEach(user => {
    if (user.finished === false) {
      unfinished.push(user);
    }
  });
  return unfinished;
};

let comparePlayers = (playerA, playerB) => {
  let expectedScoreA = elo.getExpected(playerA.rating, playerB.rating);
  let expectedScoreB = elo.getExpected(playerB.rating, playerA.rating);
  ratingA = elo.updateRating(expectedScoreA, 1, playerA.rating);
  ratingB = elo.updateRating(expectedScoreB, 0, playerB.rating);
  patchUser(playerA.username, ratingA);
  patchUser(playerB.username, ratingB);
};

let ratingChange = (playerA, playerB) => {
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

let compareUnfinished = (playerA, playerB) => {
  let expectedScoreA = elo.getExpected(playerA.rating, playerB.rating);
  let expectedScoreB = elo.getExpected(playerB.rating, playerA.rating);
  ratingA = elo.updateRating(expectedScoreA, 1, playerA.rating);
  ratingB = elo.updateRating(expectedScoreB, 0, playerB.rating);
  patchUser(playerB.username, ratingB);
};

const retrieveUsers = array => {
  return new Promise(async resolve => {
    let ret = [];
    for (let i = 0; i < array.length; i++) {
      let data = await getUser(array[i].username);
      ret.push(data);
    }
    resolve(ret);
  });
};

const rankFinishers = async () => {
  let unfinishedUsers = getUnfinished(gameRoom);
  let finished;
  let unfinished;

  finished = await retrieveUsers(scoreboard);
  unfinished = await retrieveUsers(unfinishedUsers);

  if (scoreboard.length + unfinishedUsers.length >= 2) {
    if (scoreboard[0]) updateWins(scoreboard[0].username);
  }

  if (finished.length >= 2) {
    for (let i = 0; i < finished.length - 1; i++) {
      ratingChange(finished[i], finished[i + 1]);
      comparePlayers(finished[i], finished[i + 1]);
    }
  }
  if (finished.length >= 1 && unfinished.length > 1) {
    for (let i = 0; i < unfinished.length; i++) {
      ratingChange(finished[finished.length - 1], unfinished[i]);
      compareUnfinished(finished[finished.length - 1], unfinished[i]);
    }
  }
  if (finished.length === 1 && unfinished.length === 1) {
    for (let i = 0; i < unfinished.length; i++) {
      ratingChange(finished[finished.length - 1], unfinished[i]);
      comparePlayers(finished[finished.length - 1], unfinished[i]);
    }
  }
};

let timer = 120;

setInterval(() => {
  if (timer === -1) {
    timer = 120;
    startGame();
  }
  ioGame.emit("timer", timer);
  timer--;
}, 1000);