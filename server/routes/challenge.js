const express = require("express");
const execute = require("../helpers/runner").execute;

let router = express.Router();

router.post("/challenge", function(req, res) {
  let solution = req.body.solution;
  let tests = req.body.tests;
  let testDescriptions = JSON.parse(req.body.testDescriptions[0]);
  let testResults = [];
  let results;
  let response;
  let message = "Success!";

  execute(solution, tests)
    .then(data => {
      if (data[0] === "'") {
        message = "Error";
        results = data;
      } else {
        const resultArray = JSON.parse(data);
        results = resultArray;
        for (let i = 0; i < resultArray.length; i++) {
          if (!resultArray[i]) {
            message = "FAILURE";
            testResults.push({
              description: testDescriptions[i],
              passing: false
            });
          } else {
            testResults.push({
              description: testDescriptions[i],
              passing: true
            });
          }
        }
      }
      response = JSON.stringify({ results, testResults, message });
      res.end(response);
    })
    .catch(err => console.log("Error in challenge submission", err));
});

module.exports = router;
