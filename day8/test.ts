import fs from "fs";
const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
let example = `30373
               25512
               65332
               33549
               35390`;

let lines = input.split("\n").map((line) => line.trim());
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
    let left = {
      visible: true,
      viewTrees: 0,
    };
    let right = {
      visible: true,
      viewTrees: 0,
    };
    let top = {
      visible: true,
      viewTrees: 0,
    };
    let bottom = {
      visible: true,
      viewTrees: 0,
    };

    // Check if tree visible in the left direction
    for (let distance = 1; distance < matrix.length; distance++) {
      if (matrix[row][col - distance] === undefined) break;
      let isVisible = matrix[row][col - distance] < tree;
      if (!isVisible) {
        left.visible = false;
        left.viewTrees++;
        break;
      }
      left.viewTrees++;
    }

    // Check if tree visible in the right direction
    for (let distance = 1; distance < matrix.length; distance++) {
      if (matrix[row][col + distance] === undefined) break;
      let isVisible = matrix[row][col + distance] < tree;
      if (!isVisible) {
        right.visible = false;
        right.viewTrees++;
        break;
      }
      right.viewTrees++;
    }

    // Check if tree visible in the bottom direction
    for (let distance = 1; distance < matrix.length; distance++) {
      if (matrix[row + distance] === undefined) break;
      let isVisible = matrix[row + distance][col] < tree;
      if (!isVisible) {
        bottom.visible = false;
        bottom.viewTrees++;
        break;
      }
      bottom.viewTrees++;
    }

    // Check if tree visible in the top direction
    for (let distance = 1; distance < matrix.length; distance++) {
      if (matrix[row - distance] === undefined) break;
      let isVisible = matrix[row - distance][col] < tree;
      if (!isVisible) {
        top.visible = false;
        top.viewTrees++;
        break;
      }
      top.viewTrees++;
    }
    //     console.log(
    //       `Tree ${tree} at [${row},${col}] is
    // Left: ${JSON.stringify(left, null, 4)}
    // Right: ${JSON.stringify(right, null, 4)}
    // Bottom: ${JSON.stringify(bottom, null, 4)}
    // Top: ${JSON.stringify(top, null, 4)}`
    //     );
    let scenicScore =
      left.viewTrees * right.viewTrees * bottom.viewTrees * top.viewTrees;
    if (scenicScore > bestScenicScore) bestScenicScore = scenicScore;
    if (!(left.visible || right.visible || bottom.visible || top.visible)) {
      continue;
    }
    visibleTrees++;
  }
}
console.log({ visibleTrees });
console.log({ bestScenicScore });
// console.log(matrix);
