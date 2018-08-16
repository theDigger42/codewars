const mongoose = require('mongoose');
const validate = require('mongoose-validator')

mongoose.connect('mongodb://kyle:kyle@ds127982.mlab.com:27982/codefightclub');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('Connected to db...');
});

const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 12],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Name should contain alpha-numeric characters only',
  }),
]

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, validate: nameValidator },
  password: String,
  isAdmin: {
    type: Boolean,
    default: false
  },
  wins: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 1000
  },
  rank: {
    type: String,
    default: 'New'
  }
});

const ToyProblemSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  body: String,
  funcName: String,
  params: String,
  tests: Array,
  testDescriptions: Array
});

const UserChallengeSchema = new mongoose.Schema({
  owner: { type: String },
  title: { type: String },
  body: String,
  tests: String,
  testDescriptions: String,
  solution: String
})

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

const User = mongoose.model('User', UserSchema, 'users');
const ToyProblem = mongoose.model('ToyProblem', ToyProblemSchema, 'toyProblems');
const UserChallenge = mongoose.model('UserChallenge', UserChallengeSchema, 'userChallenges');
const Scoreboard = mongoose.model('Scoreboard', ScoreboardSchema, 'scoreboard');


//Gets the top users based on score from User schema
let findLeaderboard = (callback) => {
  User.find((err, users) => {
    let names = users && users.map(user => {
      return {
        username: user.username,
        rating: user.rating,
        wins: user.wins,
        rank: user.rank
      }
    })
    if (err) {
      console.log(err);
    } else {
      callback(names);
    }
  })
    .sort({ 'rating': -1 });
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

//Find scoreboard by day // THIS WORKS
let findScoreboardByDay = (callback) => {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  Scoreboard.aggregate([
    { $match: { entry: { $gt: new Date(today) } } },
    { $group: { _id: '$username', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ], function (err, results) {
    if (err) {
      console.log('err in scoreboard aggregate');
    } else {
      callback(results);
    }
  });
}

let patchUser = (username, rating) => {

  if (rating < 800) {
    rankPlayer(username, rating, "Bad")
    return
  } else if (rating < 900 && rating >= 800) {
    rankPlayer(username, rating, "Noob")
    return
  } else if (rating < 1000 && rating >= 900) {
    rankPlayer(username, rating, "Script Kiddie")
    return
  } else if (rating < 1100 && rating >= 1000) {
    rankPlayer(username, rating, "Brogrammer")
    return
  } else if (rating < 1200 && rating >= 1100) {
    rankPlayer(username, rating, "Dev")
    return
  } else if (rating < 1300 && rating >= 1200) {
    rankPlayer(username, rating, "Senior")
    return
  } else if (rating < 1400 && rating >= 1300) {
    rankPlayer(username, rating, "Architect")
    return
  } else if (rating < 1500 && rating >= 1400) {
    rankPlayer(username, rating, "Genius")
    return
  } else if (rating < 1600 && rating >= 1500) {
    rankPlayer(username, rating, "Legend")
    return
  } else if (rating < 1700 && rating >= 1600) {
    rankPlayer(username, rating, "Hacker")
    return
  } else {
    User.updateOne({"username": username}, {$set: {"rating": rating}}, (err, res) => {
      if (err) console.log(err)
    })
  }
}

let updateWins = (username) => {
  User.updateOne({"username": username}, {$inc: {"wins": 1}}, (err, res) => {
    if (err) console.log(err)
  })
}

let rankPlayer = (username, rating, rank) => {
  User.updateOne({"username": username}, {$set: {"rating": rating, "rank": rank}}, (err, res) => {
    if (err) console.log(err)
  })
}

let getUser = (username) => {
  return new Promise((resolve) => {
    User.findOne({"username": username})
    .then(user => {
      let userData = {
        username: user.get('username'),
        rating: user.get('rating'),
        rank: user.get('rank'),
        wins: user.get('wins'),
        finished: false
      }
      resolve(userData)
    })
  })
}

// Database export
// Database export  
module.exports.db = db;

//User collection export
module.exports.User = User;
module.exports.Scoreboard = Scoreboard;
module.exports.UserChallenge = UserChallenge
module.exports.ToyProblem = ToyProblem;

//User functions
module.exports.findLeaderboard = findLeaderboard;
module.exports.findToyProblems = findToyProblems;
module.exports.findScoreboardByDay = findScoreboardByDay;
module.exports.patchUser = patchUser
module.exports.getUser = getUser
module.exports.updateWins = updateWins