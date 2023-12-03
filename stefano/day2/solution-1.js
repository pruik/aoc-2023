import {data, testData, testResult1} from './data.js';

const lines = testData.split('\n');

const cubesMap = {
  red: 12,
  green: 13,
  blue: 14
}

// line
// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green

const result = lines.reduce((acc, line) => {
  const [ gameName, gameReveals ] = line.split(':');
  const gameId = gameName.split(' ')[1];
  const gameIdNumber = parseInt(gameId);

  const isLineValid = gameReveals
  .split(';')
  .map(extractGroup)
  .map(transformToGroup)
  .reduce(isGroupValid, true);

  if (isLineValid) {
    acc += gameIdNumber;
  }

  return acc;
}, 0);

console.log(result);

function isGroupValid(acc, group) {
  const groupKeys = Object.keys(group);
  const isGroupValid = groupKeys.every((key) => cubesMap[key] >= group[key]);
  return acc && isGroupValid ;
}

function extractGroup(reveal) {
    return reveal.trim().split(",");
}

function transformToGroup(group) {
  return group.reduce((acc, item) => {
    const [ number, color ] = item.trim().split(' ');
    const numberNumber = parseInt(number);
    acc[color] = numberNumber;
    return acc;
  }, {});
}
