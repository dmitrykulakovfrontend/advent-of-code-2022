import fs from "fs";
const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
let example = `30373
25512
65332
33549
35390`;

let lines = example.split("\n");
let visibleTrees = 0;

let matrix: number[][] = [];
let bestScenicScore = 0;
/*
creating matrix like this:
[
  [ 3, 0, 3, 7, 3 ],
  [ 2, 5, 5, 1, 2 ],
  [ 6, 5, 3, 3, 2 ],
  [ 3, 3, 5, 4, 9 ],
  [ 3, 5, 3, 9, 0 ]
]
*/
for (let i = 0; i < lines.length; i++) {
  matrix.push(lines[i].split("").map(Number));
}

for (let row = 0; row < matrix.length; row++) {
  for (let col = 0; col < matrix[row].length; col++) {
    let tree = matrix[row][col];
    let directions = [
      {
        name: "left",
        visible: true,
        viewTrees: 0,
      },
      {
        name: "right",
        visible: true,
        viewTrees: 0,
      },
      {
        name: "bottom",
        visible: true,
        viewTrees: 0,
      },
      {
        name: "top",
        visible: true,
        viewTrees: 0,
      },
    ];

    for (let direction of directions) {
      // Check if tree visible in the direction
      for (let distance = 1; distance < matrix.length; distance++) {
        let treeInThatDirection: number | undefined | number[];
        switch (direction.name) {
          case "left":
            treeInThatDirection = matrix[row][col - distance];
            break;
          case "right":
            treeInThatDirection = matrix[row][col + distance];
            break;
          case "bottom":
            treeInThatDirection =
              matrix[row + distance] && matrix[row + distance][col];
            break;
          case "top":
            treeInThatDirection =
              matrix[row - distance] && matrix[row - distance][col];
            break;
          default:
            break;
        }
        if (treeInThatDirection === undefined) break;
        let isVisible = treeInThatDirection < tree;
        if (!isVisible) {
          direction.visible = false;
          direction.viewTrees++;
          break;
        }
        direction.viewTrees++;
      }
    }
    let scenicScore = directions.reduce(
      (score, direction) => score * direction.viewTrees,
      1
    );
    if (scenicScore > bestScenicScore) bestScenicScore = scenicScore;
    if (directions.some((direction) => direction.visible)) {
      visibleTrees++;
    }
  }
}
console.log({ visibleTrees });
console.log({ bestScenicScore });
