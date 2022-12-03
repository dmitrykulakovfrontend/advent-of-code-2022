import fs from "fs";
const getPriority = (char: string) => {
  if (char.toUpperCase() === char) {
    return char.charCodeAt(0) - 38;
  } else {
    return char.charCodeAt(0) - 96;
  }
};
const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
let counter = 0;
let result: string[] = [];
let temp = "";
for (let char of input) {
  if (char === "\n") {
    counter++;
    temp += char;
    if (counter === 3) {
      result.push(temp);
      temp = "";
      counter = 0;
    }
  } else {
    temp += char;
  }
}
// this is very bad, I know...
let sum = result.map((group) => {
  let str = group.split("\n");
  for (let char of str[0]) {
    for (let char2 of str[1]) {
      for (let char3 of str[2]) {
        if (char === char2 && char === char3) {
          return getPriority(char);
        }
      }
    }
  }
  return 0;
});
// let sum = sacks.map((sack) => {
//   let firstPart = sack.slice(0, Math.floor(sack.length / 2));
//   let secondPart = sack.slice(Math.floor(sack.length / 2), sack.length);
//   for (let char of firstPart) {
//     for (let char2 of secondPart) {
//       if (char === char2) {
//         return getPriority(char);
//       }
//     }
//   }
//   return 0;
// });
console.log(sum.reduce((a, b) => a + b, 0));
