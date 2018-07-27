const User = require('../database/index.js').User;
const Scoreboard = require('../database/index.js').Scoreboard;
const ToyProblem = require('../database/index.js').ToyProblem;
const execute = require('../helpers/sandbox.js').execute;
const Promise = require('bluebird');
const db = require('../database/index.js');

// Routes for dealing with login and signup
var passportRoutes = function(app, passport) {
  require('../config/passport.js')(passport);


  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/signupSuccess',
    failureRedirect: '/signupFailure'
  }));
  app.get('/signupSuccess', function(req, res) {
    res.statusCode = 201;
    res.send('successful signup');
  });
  app.get('/signupFailure', function(req, res) {
    res.statusCode = 406;
    res.send('failed signup');
  });


  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  }));
  app.get('/loginSuccess', function(req, res) {
    res.statusCode = 200;
    res.send('successful login');
  });
  app.get('/loginFailure', function(req, res) {
    res.statusCode = 406;
    res.send('failed login');
  });


  app.get('/logout', function(req, res) {
    console.log('Logging out user: ' + req.user);
    req.logout();
    res.end('Logout was a success!');
  });

};

var challengeRoutes = function(app) {

  //Route for running tests on toyProblem
  app.post('/challenge', function(req, res) {
    let funcName = req.body.funcName;
    let solution = req.body.solution;
    let tests = req.body.tests;
    let status;
    var testRes = [];

    //Because execute returns a promise, we need to map each test
    //to the result of execute in order to properly send an array of test results
    Promise.map(tests, function(test) {
      return execute(`${solution} ${funcName}(${test.input})`)
      .then((data) => {
        if (data !== test.expected) {
          status = 'fail';
        } else {
          status = 'pass';
        }
        return { input: test.input, actual: data, expected: test.expected, status: status};
      });
    }).then((data) => {
      res.status(200);
      res.data = data;
      res.end(JSON.stringify(data));
    });
  });

};


//Routes that deal with databse actions
var databaseRoutes = function(app) {

  //Get a random toy problem from the database
  app.get('/randomChallenge', function(req, res) {
    ToyProblem.count().exec(function(err, count) {
      var random = Math.floor(Math.random() * count);
      ToyProblem.findOne().skip(random).exec(function(err, result) {
        res.end(JSON.stringify(result));
      });
    });
  });

  // Get leaderboard of users in databse
  app.get('/leaderboard', function(req, res) {
    db.findLeaderboard((users) => {
      console.log(users);
      res.json(users);
    });
  });

    //Get leaderboard by DAY
    app.get('/leaderboardByDay', function(req, res) {
      db.findScoreboardByDay((users) => {
        console.log(users);
        res.json(users);
      });
    });

  //Get names of all toy problems in database
  app.get('/problems', function(req, res) {
    db.findToyProblems((toyProblems) => {
      res.json(toyProblems);
    });
  });

  //Get a specific toy problem from the database, using the funcName as a query.
  //NOTE: This isn't currently being used in the application.
  app.get('/challenge:name', (req, res) => {
    var func = req.params.name.slice(1);
    ToyProblem.findOne({"funcName": func}).exec(function(err, result) {
      res.end(JSON.stringify(result));
    });
  });

  //Update a user's score within the database
  app.patch('/users:name', (req, res) => {
    var name = req.params.name.slice(1);
    User.update({"username": name}, { $inc: {"score": 1} }, function(err, result) {
      if (err) console.log(err);
      console.log('patch: ', result);
    });
    res.end('updated');
  });

  //Add a toyProblem to the database
  app.post('/admin/toyProblem', (req, res) => {
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
  app.get('/isLoggedIn', function(req, res) {
    if (req.user) {
      var username = req.user.username;
      User.find({username}).exec((err, data) => {
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
  app.post('/users:name', (req, res) => {
    var name = req.params.name.slice(1);
    var dbScoreboard = new Scoreboard({"username": name});
    dbScoreboard.save((err) => {
      if (err) {
        console.log(err);
        res.end("error updating scoreboard");
      }
      res.end('posted scoreboard log');
    });
  });


};


module.exports.passportRoutes = passportRoutes;
module.exports.challengeRoutes = challengeRoutes;
module.exports.databaseRoutes = databaseRoutes;
