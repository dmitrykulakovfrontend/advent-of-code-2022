import fs from "fs";
const input = fs.readFileSync(__dirname + "/input.txt", "utf8");

const crates = [
  ['S','M','R','N','W','J','V','T'],
  ['B','W','D','J','Q','P','C','V'],
  ['B','J','F','H','D','R','P'],
  ['F','R','P','B','M','N','D'],
  ['H','V','R','P','T','B'],
  ['C','B','P','T'],
  ['B','J','R','P','L'],
  ['N','C','S','L','T','Z','B','W'],
  ['L','S','G'],
]

const commands = input.split('\n').map(msg => msg.replace(/[^\d]+/g, ' ').trim().split(' ').map(Number));
for (let [amount, source, destination] of commands) {
  let items: string[] = []
  for (let i = 0; i < amount; i++) {
    let item = crates[source - 1].pop();
    if (!item) continue;
    items.push(item);
  }
  for (let i = items.length - 1; i > 0; i--) {
    crates[destination - 1].push(items[i]);
  }
}
console.log(crates.map(list => list[list.length - 1]).join(''));