import fs from "fs";
const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
const example = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;
const example2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;
let lines = example.split("\n");

const visitedCells = new Set();
visitedCells.add("0,0");

type Coordinates = {
  x: number;
  y: number;
};
class Tail {
  current: {
    x: number;
    y: number;
  };
  previous: {
    x: number;
    y: number;
  };

  constructor(
    current: { x: number; y: number },
    previous: { x: number; y: number }
  ) {
    this.current = current;
    this.previous = previous;
  }
}

// Create an empty array of length 9
const tails: Tail[] = [];
for (let i = 0; i < 9; i++) {
  tails[i] = new Tail({ x: 0, y: 0 }, { x: 0, y: 0 });
}
const head = {
  current: {
    x: 0,
    y: 0,
  } as Coordinates,
  previous: {
    x: 0,
    y: 0,
  } as Coordinates,
};

const directions: { [key: string]: Coordinates } = {
  U: {
    x: 0,
    y: 1,
  },
  R: {
    x: 1,
    y: 0,
  },
  D: {
    x: 0,
    y: -1,
  },
  L: {
    x: -1,
    y: 0,
  },
};

for (let line of lines) {
  let arr = line.split(" ");
  let direction = arr[0];
  let amount = +arr[1];
  let movement = directions[direction];
  while (amount > 0) {
    /*
    [ ][ ][ ][ ][ ]
    [ ][ ][ ][ ][ ]
    [ ][ ][ ][ ][ ]
    [ ][ ][ ][ ][h]
    [ ][ ][ ][t][ ]
    hX = 0
    hY = -2
    tX = 0
    tY = 0
    */
    head.previous = {
      x: head.current.x,
      y: head.current.y,
    };
    head.current.x += movement.x;
    head.current.y += movement.y;
    if (isNotTouching(tails[0].current, head.current, 1)) {
      tails[0].previous = {
        x: tails[0].current.x,
        y: tails[0].current.y,
      };
      tails[0].current = {
        x: head.previous.x,
        y: head.previous.y,
      };
    }
    for (let i = 1; i < tails.length; i++) {
      let tail = tails[i];
      let prevTail = tails[i - 1];
      if (isNotTouching(tail.current, prevTail.current, 1)) {
        tails[i].previous = {
          x: tails[i].current.x,
          y: tails[i].current.y,
        };
        tail.current = {
          x: prevTail.previous.x,
          y: prevTail.previous.y,
        };
        if (i === 8) {
          visitedCells.add(`${tail.current.x},${tail.current.y}`);
        }
      }
    }
    amount -= 1;
  }
}
function isNotTouching(a: Coordinates, b: Coordinates, minDistance: number) {
  // Use the Pythagorean theorem to calculate the distance between the objects
  const distance = Math.floor(
    Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
  );

  // Compare the distance to the minimum distance threshold
  return distance > minDistance;
}
console.log(tails);
console.log(visitedCells.size);
