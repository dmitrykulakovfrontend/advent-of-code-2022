import fs from "fs";
const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
const example = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;
type Monkey = {
  items: number[];
  inspectedTimes: number;
};
let monkeysArr: Monkey[] = [];
let monkeys = input.split("\n\n");

let divprod = 1;

monkeys.map((monkey) => {
  const startingItemsLine = monkey.split(`\n`)[1];
  let startingItemsArray = startingItemsLine
    .split(":")[1]
    .split(",")
    .map((item) => +item.trim());

  let testLine = monkey.split(`\n`)[3];
  divprod *= +testLine.split(" ").at(-1)!;

  monkeysArr.push({ items: startingItemsArray, inspectedTimes: 0 });
});
for (let index = 0; index < 10000; index++) {
  monkeys.map((monkey, i) => {
    let currentMonkey = monkeysArr[i];
    for (let j = 0; j <= currentMonkey.items.length; j++) {
      let currentWorryLevel = currentMonkey.items.shift();
      currentMonkey.inspectedTimes++;
      if (currentWorryLevel) j = 0;
      else break;
      // console.log("🚀 ~ currentWorryLevel", currentWorryLevel);

      const operationLine = monkey.split(`\n`)[2];
      let operationValue = operationLine.split(" ").at(-1)!;
      if (operationValue === "old")
        operationValue = currentWorryLevel.toString();

      let operator = operationLine.split(" ").at(-2)!;

      let newWorryLevel = eval(
        `currentWorryLevel ${operator} ${+operationValue}`
      );

      newWorryLevel %= divprod;
      let testLine = monkey.split(`\n`)[3];
      let testValue = +testLine.split(" ").at(-1)!;

      let indexOfSuccessMonkey = +monkey.split(`\n`)[4].split(" ").at(-1)!;
      let indexOfFailedMonkey = +monkey.split(`\n`)[5].split(" ").at(-1)!;

      if (newWorryLevel % testValue === 0) {
        monkeysArr[indexOfSuccessMonkey].items.push(newWorryLevel);
      } else {
        monkeysArr[indexOfFailedMonkey].items.push(newWorryLevel);
      }
    }
  });
}

console.log(divprod);

monkeysArr = monkeysArr.sort((a, b) => b.inspectedTimes - a.inspectedTimes);
console.log(monkeysArr);
console.log(monkeysArr[0].inspectedTimes * monkeysArr[1].inspectedTimes);
