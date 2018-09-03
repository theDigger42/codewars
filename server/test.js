const exec = require('child_process').exec;

const dockerCommand = 'docker run --rm codewars/node-runner run -l javascript -c';

// exec(`${dockerCommand}\" ${code} ${tests}\"`, function(err, stdout, stderr) {
//   console.log('STDOUT', stdout);
// });

let execute = (code, tests) => {
  exec(`${dockerCommand} ${code} return ${tests}`, (err, stdout, stderr) => {
    console.log('STDOUT', stdout);
  });
};

let code = `let add = (a, b) => a + b;`
let tests = `[typeof add === 'function', typeof add(1, 2) === 'number', add(2, 4) === 6]`;

execute(code, tests);