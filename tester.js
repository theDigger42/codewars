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