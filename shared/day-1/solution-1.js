import { data, testData, testResult } from "./input.js"


const splittedData = data.split("\n");

let sum = 0;

for (const line of splittedData) {
  const digits = line.match(/\d/g);
  const first = digits[0];
  const last = digits.at(-1);
  const num = parseInt(`${first}${last}`)
  sum += num;
}

console.log(sum);
