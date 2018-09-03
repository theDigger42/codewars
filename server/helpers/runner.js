const Promise = require("bluebird");
const exec = require('child_process').exec;

const dockerCommand = 'docker run --rm codewars/node-runner run -l javascript -c';

let execute = (code, tests) => {
  return new Promise((resolve, reject) => {
    exec(`${dockerCommand} \"${code}; console.log(${tests})\"`, (err, stdout, stderr) => {
      if (err) reject(err);
      if (stderr) reject(stderr);
      resolve(stdout);
    });
  });
};

module.exports.execute = execute