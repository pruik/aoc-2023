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

function sumDoubleDigitPerLine(wordDigitRegexString, wordDigitRegexStringLast, mapNumbers){
  return (sum, line) => {
    const firstDigit = line.match(wordDigitRegexString)[1];
    const lastDigit = line.match(wordDigitRegexStringLast)[1];
    
    const firstString= mapNumbers[firstDigit] || firstDigit;
    const lastString= mapNumbers[lastDigit] || lastDigit;
    
    return sum + parseInt(firstString + lastString);
  };
}

const sumDoubleDigitPerLineReducer = sumDoubleDigitPerLine(wordDigitRegexString, wordDigitRegexStringLast, mapNumbers);
const sum = splittedData.reduce(sumDoubleDigitPerLineReducer, 0);
console.log(sum);
