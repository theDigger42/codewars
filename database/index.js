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
    default: false
  },
  wins: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 1500
  },
  rank: {
    type: String,
    default: 'Noob'
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
    .sort({ 'score': -1 });
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
  if (rating < 400) {
    rankPlayer(username, rating, "Terrible")
    return
  } else if (rating < 500 && rating >= 400) {
    rankPlayer(username, rating, "Awful")
    return
  } else if (rating < 600 && rating >= 500) {
    rankPlayer(username, rating, "Bad")
    return
  } else if (rating < 700 && rating >= 600) {
    rankPlayer(username, rating, "Noob")
    return
  } else if (rating < 800 && rating >= 700) {
    rankPlayer(username, rating, "Beginner")
    return
  } else if (rating < 900 && rating >= 800) {
    rankPlayer(username, rating, "Script Kiddie")
    return
  } else if (rating < 1000 && rating >= 900) {
    rankPlayer(username, rating, "Junior")
    return
  } else if (rating < 1100 && rating >= 1000) {
    rankPlayer(username, rating, "Coder")
    return
  } else if (rating < 1200 && rating >= 1100) {
    rankPlayer(username, rating, "Brogrammer")
    return
  } else if (rating < 1300 && rating >= 1200) {
    rankPlayer(username, rating, "Dev")
    return
  } else if (rating < 1400 && rating >= 1300) {
    rankPlayer(username, rating, "Engineer")
    return
  } else if (rating < 1500 && rating >= 1400) {
    rankPlayer(username, rating, "Senior")
    return
  } else if (rating < 1600 && rating >= 1500) {
    rankPlayer(username, rating, "Architect")
    return
  } else if (rating < 1700 && rating >= 1600) {
    rankPlayer(username, rating, "Brilliant")
    return
  } else if (rating < 1800 && rating >= 1700) {
    rankPlayer(username, rating, "Genius")
    return
  } else if (rating >= 1800) {
    rankPlayer(username, rating, "Hacker")
    return
  } else {
    User.updateOne({"username": username}, {$set: {"rating": rating}}, (err, res) => {
      if (err) console.log(err)
      console.log(res);
    })
  }
}

let updateWins = (username) => {
  User.updateOne({"username": username}, {$inc: {"wins": 1}}, (err, res) => {
    if (err) console.log(err)
    console.log(res)
  })
}

let rankPlayer = (username, rating, rank) => {
  User.updateOne({"username": username}, {$set: {"rating": rating, "rank": rank}}, (err, res) => {
    if (err) console.log(err)
    console.log(res)
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

// Toy problem export
module.exports.ToyProblem = ToyProblem;

//User functions
module.exports.findLeaderboard = findLeaderboard;
module.exports.findToyProblems = findToyProblems;
module.exports.findScoreboardByDay = findScoreboardByDay;
module.exports.patchUser = patchUser
module.exports.getUser = getUser
module.exports.updateWins = updateWins