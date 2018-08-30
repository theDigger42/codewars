const Sandbox = require("sandbox");
const box = new Sandbox();
const Promise = require("bluebird");

box.options.timeout = 3000;

var execute = function(code, tests) {
  return new Promise(resolve => {
    box.run(`${code} ${tests};`, output => {
      resolve(output.result);
    });
  });
};

module.exports.execute = execute;
