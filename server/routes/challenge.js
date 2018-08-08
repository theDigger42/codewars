const express = require('express')
const execute = require('../../helpers/runner').execute;

let router = express.Router()

router.post('/challenge', function (req, res) {
  let solution = req.body.solution;
  let tests = req.body.tests;
  let testDescriptions = req.body.testDescriptions
  let testResults
  let response
  let message = 'Success!'

  execute(solution, tests)
    .then((data) => {
      if (data[0] === "'") {
        message = 'Error'
        testResults = data
      } else {
        console.log('DATA RESULTS', data)
        const resultArray = JSON.parse(data)
        testResults = resultArray
        for (let i = 0; i < resultArray.length; i++) {
          if (!resultArray[i]) {
            message = 'FAILURE'
            break
          }
        }
      }
      console.log(testResults, message)
      response = JSON.stringify({ testResults, message })
      res.end(response)
    }).catch(err => console.log('Error in challenge submission', err))

})

module.exports = router