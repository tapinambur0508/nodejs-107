function sum(a, b, c) {
  return a + b + c;
}

console.log(sum.length);
console.log(sum.toString());

const sum2 = sum.bind(null, 2);
const sum3 = sum.bind(null, 3);

console.log(sum2(1, 1));
console.log(sum3(1, 1));
