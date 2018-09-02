const Promise = require("bluebird");
const {VM} = require('vm2');

const vm = new VM({
  timeout: 3000,
  sandbox: {}
});

let execute = (code, tests) => {
  return new Promise(resolve => resolve(vm.run(`${code} ${tests}`)))
};

module.exports.execute = execute
