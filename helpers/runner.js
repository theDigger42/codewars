const Sandbox = require('./sandbox');
const box = new Sandbox();
const Promise = require('bluebird');

var execute = function (code) {
  return new Promise((resolve) => {
    box.run(`${code};`, (output) => {
      resolve(output.result);
    });
  });
};

module.exports.execute = execute;
