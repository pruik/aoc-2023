import { data, testData2, testResult2 } from "../../shared/day-1/input.js"

const splittedData = data.split("\n");
const mapNumbers = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9"
};
const mapNumbersKeys = Object.keys(mapNumbers).join("|");
const wordDigitRegexString = `(${mapNumbersKeys}|\\d)`;
const wordDigitRegexStringLast = `.*${wordDigitRegexString}`;
const matchingRegs = [wordDigitRegexString, wordDigitRegexStringLast];

function sumDoubleDigitPerLine(matchingRegs, mapNumbers){
  return (sum, line) => {
    const stringNum = matchingRegs.map(extractNumberWithReg(line, mapNumbers)).join("");
    return sum + parseInt(stringNum);
  };
}

function extractNumberWithReg(line, mapNumbers) {
  return (reg) => {
    const digit = line.match(reg)[1];
    return mapNumbers[digit] || digit;
  };
}

const sumDoubleDigitPerLineReducer = sumDoubleDigitPerLine(matchingRegs, mapNumbers);
const sum = splittedData.reduce(sumDoubleDigitPerLineReducer, 0);
console.log(sum);
