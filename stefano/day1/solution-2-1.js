import { data, testData2, testResult2 } from "../../shared/day-1/input.js"


const splittedData = data.split("\n");

const numberWordsString = "one|two|three|four|five|six|seven|eight|nine";
const numberWordList = numberWordsString.split("|");

const firstDigitRegString = `(${numberWordsString}|\\d)`;
const lastDigitRegString = `.*(${numberWordsString}|\\d)`;

const sum = splittedData.map(extractNumberFromLine).reduce(add, 0);

function extractNumberFromLine(line) {
  const firstString = extractDigitFromLine(line, firstDigitRegString);
  const lastString = extractDigitFromLine(line, lastDigitRegString);
  return parseInt(firstString + lastString);
}

function extractDigitFromLine(line, regexString){
  const regex = new RegExp(regexString);
  const digit = line.match(regex)[1];
  return stringToDigitString(digit);
}

function stringToDigitString(string) {
  const index = numberWordList.indexOf(string);
  return index === -1 ? string : `${index + 1}`;
}

function add(sum, lineNum) {
  return sum + lineNum;
}

console.log(sum);
