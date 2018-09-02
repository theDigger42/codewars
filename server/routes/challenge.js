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
  .then(resultArray => {
    resultArray.forEach((result, i) => {
      if (!result) {
        message = "FAILURE";
        testResults.push({
          description: testDescriptions[i],
          passing: false
        })
      } else {
        testResults.push({
          description: testDescriptions[i],
          passing: true
        })
      }
    })
    response = JSON.stringify({ results, testResults, message });
    res.end(response);
  })
});

module.exports = router;
