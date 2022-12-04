import fs from "fs";
const input = fs.readFileSync(__dirname + "/input.txt", "utf8");

let pairs = input.split("\n");
let elves = pairs.map((pair) => pair.split(","));
console.log(
  elves.reduce((acc, curr) => {
    let firstElf = curr[0].split("-").map(Number);
    let secondElf = curr[1].split("-").map(Number);
    if (firstElf[1] >= secondElf[0] && firstElf[0] <= secondElf[1]) {
      return acc + 1;
    }
    return acc;
  }, 0)
);
