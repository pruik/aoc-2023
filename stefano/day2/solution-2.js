import {data, testData, testResult2} from './data.js';
const lines = data.split('\n');

// line
// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green

const powerSum = lines.reduce((acc, line) => {
  const game = line.split(':')[1];
  const result = game
  .split(';')
  .reduce((acc, reveal) => {
    const group = reveal
    .trim()
    .split(",")
    .reduce(groupColorToObj, { red: 1, green: 1, blue: 1});
    return keepMax(acc, group);
  }, { red: 1, green: 1, blue: 1 });

  const power = result.red * result.green * result.blue;
  return acc + power;
}, 0);

console.log(powerSum, testResult2);

function groupColorToObj(acc, item) {
  const [ number, color ] = item.trim().split(' ');
  const numberNumber = parseInt(number);
  acc[color] = numberNumber;
  return acc;
}

function keepMax(a, b){
  return {
    red: a.red > b.red ? a.red : b.red,
    green: a.green > b.green ? a.green : b.green,
    blue: a.blue > b.blue ? a.blue : b.blue
  }
}

