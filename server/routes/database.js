const express = require('express')
const db = require('../../database/index.js');
const User = require('../../database/index.js').User;
const Scoreboard = require('../../database/index.js').Scoreboard;
const ToyProblem = require('../../database/index.js').ToyProblem;

let router = express.Router()

//Get a random toy problem from the database
router.get('/randomChallenge', function (req, res) {
  ToyProblem.count().exec(function (err, count) {
    var random = Math.floor(Math.random() * count);
    ToyProblem.findOne().skip(random).exec(function (err, result) {
      res.end(JSON.stringify(result));
    });
  });
});

// Get leaderboard of users in databse
router.get('/leaderboard', function (req, res) {
  db.findLeaderboard((users) => {
    res.json(users);
  });
});

//Get leaderboard by DAY
router.get('/leaderboardByDay', function (req, res) {
  db.findScoreboardByDay((users) => {
    res.json(users);
  });
});

//Get names of all toy problems in database
router.get('/problems', function (req, res) {
  db.findToyProblems((toyProblems) => {
    res.json(toyProblems);
  });
});

//Get a specific toy problem from the database, using the funcName as a query.
//NOTE: This isn't currently being used in the application.
router.get('/challenge:name', (req, res) => {
  var title = req.params.name.slice(1);
  ToyProblem.findOne({ "title": title }).exec(function (err, result) {
    if (err) console.log(err)
    res.end(JSON.stringify(result));
  });
});

//Update a user's score within the database
router.patch('/users:name', (req, res) => {
  var name = req.params.name.slice(1);
  User.update({ "username": name }, { $inc: { "wins": 1 } }, function (err, result) {
    if (err) console.log(err);
  });
  res.end('updated');
});

//Add a toyProblem to the database
router.post('/admin/toyProblem', (req, res) => {
  var problem = {};
  problem.title = req.body.title;
  problem.body = req.body.body;
  problem.funcName = req.body.code;
  problem.params = req.body.params;
  problem.tests = JSON.parse(req.body.tests);
  var dbProblem = new ToyProblem(problem);
  dbProblem.save((err) => {
    if (err) {
      console.log(err);
      res.end("error saving db");
    }
    res.end('saved to db');
  });
});

//Check whether or not a user is logged in
router.get('/isLoggedIn', function (req, res) {
  if (req.user) {
    var username = req.user.username;
    User.find({ username }).exec((err, data) => {
      if (err) {
        console.log(err);
      }
      res.send(data[0]);
    });
  } else {
    res.send(undefined);
  }
});

//Posts to scoreboard schema
router.post('/users:name', (req, res) => {
  var name = req.params.name.slice(1);
  var dbScoreboard = new Scoreboard({ "username": name });
  dbScoreboard.save((err) => {
    if (err) {
      console.log(err);
      res.end("error updating scoreboard");
    }
    res.end('posted scoreboard log');
  });
});

module.exports = router;