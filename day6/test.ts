import fs from "fs";
const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
for (let index = 0; index < input.length; index++) {
  let array: string[] = []
  for (let i = index; i < index + 14; i++) {
    if (input[i]) {
      array.push(input[i])
    }
  }

  let set = new Set(array);

  console.log({set, array})
  if (set.size === array.length) {
    console.log(index + 14)
    break;
  }
}