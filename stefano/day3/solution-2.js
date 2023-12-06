import { data, testData, testResult2 } from './data.js';
// 467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..

// const lines = testData.split('\n');
const lines = data.split('\n');

const numberLines = lines.map(extractNumbers);
const starsLines = lines.map(extractStars);

const result = starsLines.reduce((sum, stars, lineIndex) => {
  const lineSum = stars.reduce(reduceAdjacentNumbers(numberLines, lineIndex), 0);
  return sum + lineSum;
}, 0);

console.log(result);

function reduceAdjacentNumbers(numberLines, lineIndex) {
  return (sum, gearIndex) => {
    const previousLine = numberLines[lineIndex - 1] ?? [];
    const currentLine = numberLines[lineIndex];
    const nextLine = numberLines[lineIndex + 1] ?? [];
  
    const allNumberLines = [...previousLine, ...currentLine, ...nextLine];
    
    const adjacentNumbers = allNumberLines.filter(number => {
      const { startIndex, endIndex } = number;
      return (gearIndex >= startIndex - 1 && gearIndex <= endIndex + 1);
    });

    if(adjacentNumbers.length === 2) {
      return sum + (adjacentNumbers[0].value * adjacentNumbers[1].value);
    }

    return sum;
  }
}


function extractStars(line) {
  const stars = [];
  const lineChars = line.split("");
  lineChars.forEach((char, index) => {
    if (char === '*') {
      stars.push(index);
    }
  });

  return stars
}

function extractNumbers(line) {
  let numberStack = '';
  let startIndex;

  const numbers = [];
  const lineChars = line.split("")
  lineChars.forEach((char, index) => {
    if (isDigit(char)) {
      if(numberStack.length === 0){
        startIndex = index;
      }
      numberStack += char;
      return;
    }

    if (numberStack.length <= 0) {
      return;
    }
  
    numbers.push({
      value:  parseInt(numberStack),
      endIndex: index - 1,
      startIndex,
    });

    numberStack = '';
  });

  // last number 💩
  if (numberStack.length > 0) {
    numbers.push({
      value:  parseInt(numberStack),
      endIndex: lineChars.length - 1,
      startIndex,
    });
  }

  return numbers
}

function isDigit(char) {
  return char >= '0' && char <= '9';
}
