function fibonacci(n) {
  if (n === 0) return 0
  var previous_first = 0, previous_second = 1, next = 1;
  for(var i = 2; i <= n; i++) {
      next = previous_first + previous_second;
      previous_first = previous_second;
      previous_second = next;
  }
  return next;
}

function helloWorld() {
  const hello = 'Hello';
  const world = 'World';
  return `${hello} ${world}`;
}

function compareTriangleAndCircle(base, height, radius) {
  const triArea = base * height / 2;
  const circleArea = Math.PI * Math.pow(radius, 2);
  if (triArea > circleArea) {
    return 'Triangle';
  }
  return 'Circle';
}

function joinObjects(obj1, obj2) {
  Object.keys(obj2).forEach((key) => {
    if (obj1[key]) {
      obj1[key] = obj1[key];
    } else {
      obj1[key] = obj2[key];
    }
  });
  return obj1;
}

function sumArray(arr) {
  let sum = 0
  arr.forEach(el => {
    sum += el
  })
  return sum
}

function isEven(n) {
  return n % 2 === 0
}

function factorial(n) {
  if (n === 0 || n === 1 || n === 2) {
    return n
  }
  let sum = 1
  while(n > 0) {
    sum *= n
    n--
  }
  return sum
}

function reverse(str) {
  let rev = ''
  for (let i = str.length - 1; i >= 0; i--) {
    rev += str[i]
  }
  return rev
}

function nQueens(n) {
  var all = Math.pow(2,n) - 1;
  var solutionCount = 0;

  var findSolutions = function(cols,ld,rd){

    var pos = ~(cols | ld | rd) & all;

    while(pos>0){
      var bit = -pos & pos;
      pos = pos ^ bit;

      findSolutions((cols | bit), (ld | bit) << 1, (rd | bit) >> 1);

    }
    if (cols === all) {
      solutionCount++;
    }
  };
  findSolutions(0, 0, 0);
  console.log(solutionCount);
  return solutionCount;
};

console.log(nQueens(5))