const fs = require("fs");
const mongoose = require("mongoose");

mongoose.connect("mongodb://kyle:kyle@ds127982.mlab.com:27982/codefightclub");

const db = mongoose.connection;
db.collection("toyProblems").drop();

// creates new collection of initialTests with data loated in data.json
fs.readFile("./database/challenges.json", "utf8", (err, data) => {
  if (err) console.log(err);
  console.log(data);
  const problems = db.collection("toyProblems");
  problems.insert(JSON.parse(data), (err, docs) => {
    if (err) console.log(err);
    console.log(docs);
    problems.countDocuments((err, count) => {
      if (err) console.log(err);
      console.log(`${count} challenges inserted into toyProblem collection.`);
    });
  });
});
