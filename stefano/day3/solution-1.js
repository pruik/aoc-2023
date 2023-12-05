import { data, testData, testResult1 } from './data.js';
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
const symbolLines = lines.map(extractSymbols);

const result = numberLines.reduce((sum, numbers, lineIndex) => {
  const lineSum = numbers.reduce((sum, number) => {
    const { startIndex, endIndex, value } = number;
    const hasAdjacentSymbol = isNumberAdjacentToSymbol(lineIndex, startIndex, endIndex, value);
    return hasAdjacentSymbol ? sum + value : sum;
  }, 0);
  return sum + lineSum;
} , 0);

console.log(result);

function isNumberAdjacentToSymbol(lineIndex, numberStartIndex, numberEndIndex, value) {
  const previousLineSymbols = symbolLines[lineIndex - 1] ?? [];
  const currentLineSymbols = symbolLines[lineIndex];
  const nextLineSymbols = symbolLines[lineIndex + 1] ?? [];

  const symbolsList = [...previousLineSymbols, ...currentLineSymbols, ...nextLineSymbols];
  
  return symbolsList.some(symbol => {
    const { index: symbolIndex } = symbol;
    return (symbolIndex >= numberStartIndex - 1 && symbolIndex <= numberEndIndex + 1);
  });
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


function extractSymbols(line) {
  return line.split("").reduce((acc, char, index) => {
     if (!isDigit(char) && char !== ".") {
      const symbol = {
        index,
        value: char,
      };
      acc.push(symbol);
     }

     return acc;
   }, [])
}

function isDigit(char) {
  return char >= '0' && char <= '9';
}
