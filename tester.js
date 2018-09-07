let fibonacci = (n) => {
  if (n < 2){
    return n
  }
  return fibonacci(n - 1) + fibonacci(n - 2)
}

let joinObjects = (obj1, obj2) => {
  Object.keys(obj2).forEach(key => {
    if (obj1[key]) {
      obj1[key] = obj1[key];
    } else {
      obj1[key] = obj2[key];
    }
  });
  return obj1;
}

let sumArray = (arr) => {
  let sum = 0;
  arr.forEach(el => {
    sum += el;
  });
  return sum;
}

let factorial = (n) => {
  if (n === 0) return 1
  return n * factorial(n-1);
}

let reverse = (str) => {
  let rev = "";
  for (let i = str.length - 1; i >= 0; i--) {
    rev += str[i];
  }
  return rev;
}

let convertToRoman = (n) => {
  let numeral = '';
  let i = 0;
  while (n > 0) {
    if (n - values[i] >= 0) {
      numeral += numerals[i];
      n -= values[i];
    } else {
      i++;
    }
  }
  return numeral;
}

let balancedParens = (str) => {
  let stack = [];
  let pairs = {
      '[': ']',
      '(': ')',
      '{': '}'
  };
  for (let i = 0; i < str.length; i++) {
      let chr = str[i];
      if (pairs[chr]) {
          stack.push(chr);
      } else if (chr === ']' || chr === ')' || chr === '}') {
          if (pairs[stack.pop()] !== chr) {
              return false;
          }
      }
  }
  return stack.length === 0;
};

let repeatStr = (n, string) => {
  let ret = '';
  for (let i = 0; i < n; i++) {
    ret += string;
  }
  return ret;
}

let oddCount = (n) => {
  let count = 0;
  for (let i = 1; i < n; i++) {
    if (i % 2 !== 0) count++;
  }
  return count;
}

let longestPalindrome = (s) => {
  if (!s) return 0;
  for (let c = s.length; c > 0; c--) {
    for (let i = 0; i <= s.length - c; i++) {
      var check = s.substr(i, c);
      if (check === check.split("").reverse().join("")) return c;
    }
  }
}

