import fs from "fs";
const input = fs.readFileSync(__dirname + "/input.txt", "utf8");

const winOrLoss: Record<string, number> = {
  "A X": 4,
  "A Y": 8,
  "A Z": 3,
  "B X": 1,
  "B Y": 5,
  "B Z": 9,
  "C X": 7,
  "C Y": 2,
  "C Z": 6,
};
const calculatePoints: Record<string, number> = {
  "A X": 3,
  "A Y": 4,
  "A Z": 8,
  "B X": 1,
  "B Y": 5,
  "B Z": 9,
  "C X": 2,
  "C Y": 6,
  "C Z": 7,
};
let result = 0;
let a = input.split("\n");
let sum = a.reduce((acc, curr) => acc + calculatePoints[curr], 0);
console.log(sum);
