const express = require("express");
const runCode = require("../helpers/runner").runCode;
const execute = require("../helpers/runner").execute;

let router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body.code);
  let code = req.body.code ? req.body.code.replace(/"/g, "'") : null;
  runCode(code)
  .then(result => {
    res.end(result)
  })
  .catch(err => {
    res.end(err)
  })
})

router.post("/challenge", function(req, res) {
  let solution = req.body.solution;
  solution = solution.replace(/"/g, "'");
  let tests = req.body.tests;
  let testDescriptions = JSON.parse(req.body.testDescriptions[0]);
  let testResults = [];
  let results;
  let response;
  let message = "Success!";

  execute(solution, tests)
  .then(testingResults => {
    let resultArray = JSON.parse(testingResults);
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
  .catch(err => {
    testResults.push({
      description: err.toString(),
      passing: false
    });   
    response = JSON.stringify({ results, testResults, message: 'FAILURE'});
    res.end(response);
  })
});

module.exports = router