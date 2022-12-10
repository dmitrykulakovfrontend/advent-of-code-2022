import fs from "fs";
const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
const example = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop
`;

let registerX = 1;
const signals: number[] = [];
let cycle = 0;
let currentPixel = 0;
let currentRow = 0;

let screen: string[] = new Array(240).fill(0);
let currentMiddleSprite = 1;

let commands = input.split("\n");

for (let i = 0; i < commands.length; i++) {
  const [type, value] = commands[i].split(" ");
  if (type === "noop") {
    signals.push(registerX * cycle);
    drawPixel();
    cycle += 1;
  } else if (type === "addx") {
    let addxCurrentCycle = 0;
    while (addxCurrentCycle < 2) {
      signals.push(registerX * cycle);
      drawPixel();
      cycle += 1;
      addxCurrentCycle += 1;
    }
    registerX += +value;
    currentMiddleSprite = registerX;
  }
}

function drawPixel() {
  if (
    currentPixel - currentRow * 40 === currentMiddleSprite - 1 ||
    currentPixel - currentRow * 40 === currentMiddleSprite ||
    currentPixel - currentRow * 40 === currentMiddleSprite + 1
  ) {
    screen[currentPixel] = "#";
  } else {
    screen[currentPixel] = ".";
  }
  currentPixel += 1;
  if (currentPixel - currentRow * 40 >= 40) {
    currentRow += 1;
  }
}

console.log(
  signals[19] +
    signals[59] +
    signals[99] +
    signals[139] +
    signals[179] +
    signals[219]
);
const subarrays: string[] = [];
for (let i = 0; i < screen.length; i += 40) {
  const subarray = screen.slice(i, i + 40).join("");
  subarrays.push(subarray);
}
console.log(subarrays.join("\n"));
