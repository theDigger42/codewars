const ioGame = require('../index').ioGame
const ToyProblem = require('../../database/index').ToyProblem
const patchUser = require('../../database/index').patchUser
const getUser = require('../../database/index').getUser
const updateWins = require('../../database/index').updateWins
const EloRank = require('../../helpers/ranking')

const elo = new EloRank()

let waitingRoom = {}
let waitingUsers = []
let gameRoom = []
let scoreboard = []

const startGame = () => {
  rankFinishers()
  setTimeout(() => {
    gameRoom = waitingUsers;
    scoreboard = [];
    waitingUsers = [];
    waitingRoom = {};
    ToyProblem.countDocuments().exec(function (err, count) {
      var random = Math.floor(Math.random() * count);
      ToyProblem.findOne().skip(random).exec(function (err, result) {
        ioGame.emit('challenge', result)
      });
    });
    // ToyProblem.findOne({ "title": "Reverse String" }).exec(function (err, result) {
    //   ioGame.emit('challenge', result)
    // });
    setTimeout(startGame, secondsTillNextGame());
    scoreboardChange();
  }, 1000)
}

module.exports.ioGame = (socket) => {
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
    if (_user !== null) _user.finished = true
    scoreboardChange(_user);
  })
}

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

  if (scoreboard.length + unfinishedUsers.length >= 2)
    updateWins(scoreboard[0].username)

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

const secondsTillNextGame = () => 1000 * (60 - (new Date().getSeconds()));

setTimeout(startGame, secondsTillNextGame);