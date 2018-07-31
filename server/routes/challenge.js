const express = require('express')
const Promise = require('bluebird')
const execute = require('../../helpers/sandbox.js').execute;

let router = express.Router()

router.post('/challenge', function(req, res) {
    console.log(req.body);
    let funcName = req.body.funcName;
    let solution = req.body.solution;
    let tests = req.body.tests;
    let status;

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

module.exports = router