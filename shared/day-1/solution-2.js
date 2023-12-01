import { data, testData2, testResult2 } from "./input.js"


const splittedData = data.split("\n");

let sum = 0;

const magicString = "one|two|three|four|five|six|seven|eight|nine";
const splittedMagic = magicString.split("|");

function stringToDigitString(string) {
  const index = splittedMagic.indexOf(string);
  if (index === -1)
    return string;
  return "" + (index + 1);
}

for (const line of splittedData) {
  const firstRegex = new RegExp(`(${magicString}|\\d)`);
  const lastRegex = new RegExp(`.*(${magicString}|\\d)`);

  const firstDigit = line.match(firstRegex)[1];
  const lastDigit = line.match(lastRegex)[1];

  const firstString= stringToDigitString(firstDigit)
  const lastString= stringToDigitString(lastDigit)

  sum += parseInt(firstString + lastString);
}

console.log(sum);
