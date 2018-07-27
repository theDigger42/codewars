const mongoose = require('mongoose');


mongoose.connect('mongodb://kyle:kyle@ds127982.mlab.com:27982/codefightclub');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('Connected to db...');
});

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  isAdmin: {
    type: Boolean,
    default: true
  },
  score: {
    type: Number,
    default: 0
  }
});

const ToyProblemSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  body: String,
  funcName: String,
  params: String,
  tests: [
    {
      input: String,
      expected: String
    }
  ]
});

const ScoreboardSchema = new mongoose.Schema({
  username: { type: String },
  score: {
    type: Number,
    default: 1
  },
  entry: {
    type: Date,
    default: Date.now,
  }
});

const User = mongoose.model('User', UserSchema);
const ToyProblem = mongoose.model('ToyProblem', ToyProblemSchema);
const Scoreboard = mongoose.model('Scoreboard', ScoreboardSchema);

//Gets the top users based on score from User schema
let findLeaderboard = (callback) => {
  User.find((err, users) => {
    if (err) {
      console.log(err);
    } else {
      callback(users);
    }
  })
  .sort({'score': -1});
}

//Gets all toy problems, unsorted
let findToyProblems = (callback) => {
  ToyProblem.find((err, toyProblems) => {
    if (err) {
      console.log(err);
    } else {
      callback(toyProblems);
    }
  });
}

// Database export  
//Logs each solved challenge for leaderboard
let logPoints = (callback) => {
  Scoreboard.find((err, user) => {
    if (err) {
      console.log(err);
    } else {
      callback(user);
    }
  });
}

//Gets top users based on score from ScoreboardSchema // still testing
  let findScoreboard = (callback) => {
    Scoreboard.find((err, users) => {
      if (err) {
        console.log(err);
      } else {
        callback(users);
      }
    })
    .sort({'score': -1});
  }

//Find scoreboard by day // THIS WORKS
  let findScoreboardByDay = (callback) => {
    let today = new Date();
    today.setHours(0,0,0,0);
    Scoreboard.aggregate( [
      { $match: {entry: {$gt: new Date(today)} } },
      { $group: { _id: '$username', count: {$sum: 1} } },
      { $sort: {count: -1} }
    ], function(err, results) {
      if (err) {
        console.log('err in scoreboard aggregate');
      } else {
        callback(results);
      }
    });
  }

// Database export
// Database export  
module.exports.db = db;

//User collection export
module.exports.User = User;
module.exports.Scoreboard = Scoreboard;

// Toy problem export
module.exports.ToyProblem = ToyProblem;

//User functions
module.exports.findLeaderboard = findLeaderboard;
module.exports.findToyProblems = findToyProblems;
module.exports.findScoreboardByDay = findScoreboardByDay;