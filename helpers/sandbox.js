const Sandbox = require('sandbox');
const box = new Sandbox();
const Promise = require('bluebird');

var execute = function(code) {
  return new Promise((resolve) => {
    box.run(`${code};`, (output) => {
      console.log('output of running code: ' + output.result);
      resolve(output.result);
    });
  });
};

module.exports.execute = execute;
