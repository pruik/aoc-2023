import { data, testData, testResult1 } from "./data.js";

// const lines = testData.split('\n');
const lines = data.split('\n');

const winningNumbers = lines.reduce(countWinningNumbers, 0);

console.log('winningNumbers', winningNumbers);
function countWinningNumbers(sum, line) {
  const [winNumbers, myNumbers] = line.split('|');
  const winNumbersArray = winNumbers.trim().split(':')[1].trim().split(' ').map(num=>Number(num)).filter(a=>a);
  const myNumbersArray = myNumbers.trim().split(' ').map(num=>Number(num)).filter(a=>a);

  const uniqueNumbers = new Set([...winNumbersArray, ...myNumbersArray]);
  const winCount = (winNumbersArray.length + myNumbersArray.length) - uniqueNumbers.size;
  const powVal = winCount === 0 ? 0 : Math.pow(2,(winCount-1));
  return sum + powVal;
}
