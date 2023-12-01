import { data, testData2, testResult2 } from "../../shared/day-1/input.js"

const magicString = "one|two|three|four|five|six|seven|eight|nine";

const splittedData = data.split("\n");
const sum = splittedData.reduce(sumDoubleDigitPerLine(magicString), 0);

function sumDoubleDigitPerLine(magicString) {
  const splittedMagic = magicString.split("|");
  return (sum, line) => {
    const firstRegex = new RegExp(`(${magicString}|\\d)`);
    const lastRegex = new RegExp(`.*(${magicString}|\\d)`);

    const firstDigit = line.match(firstRegex)[1];
    const lastDigit = line.match(lastRegex)[1];

    const firstString = wordOrNumberStringToDigitString(splittedMagic, firstDigit);
    const lastString = wordOrNumberStringToDigitString(splittedMagic, lastDigit);

    return sum + parseInt(firstString + lastString);
  };
}

function wordOrNumberStringToDigitString(splittedMagic, string){
  const index = splittedMagic.indexOf(string);
  return index === -1 ? string : `${index + 1}`;
}

console.log(sum);
