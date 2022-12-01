import fs from "fs";
const input = fs.readFileSync(__dirname + "/input.txt", "utf8");

let elves = input.split("\n\n");
let sums = elves
  .map((elf) => elf.split("\n").reduce((acc, curr) => acc + +curr, 0))
  .sort((a, b) => b - a);
console.log(sums[0] + sums[1] + sums[2]);
