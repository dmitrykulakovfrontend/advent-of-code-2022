import fs from "fs";
const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
let temp = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

let lines = input.split("\n");
let fileStructure: any = { "/": { folder: true } };
let current = fileStructure;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  if (isCommand(line)) {
    switch (formatCommand(line)[0]) {
      case "cd": {
        let command = formatCommand(line);
        if (command[1] === "..") {
          current = current.parent;
        } else {
          current = current[command[1]];
        }
        break;
      }
      case "ls": {
        i += 1;
        line = lines[i];
        while (!isCommand(lines[i + 1])) {
          switch (Number.isInteger(+line.split(" ")[0])) {
            case false:
              current[line.split(" ")[1]] = { parent: current, folder: true };
              i += 1;
              line = lines[i];
              break;
            case true: {
              current[line.split(" ")[1]] = {
                size: +line.split(" ")[0],
                file: true,
              };
              i += 1;
              line = lines[i];
              break;
            }

            default:
              break;
          }
        }
        switch (Number.isInteger(+line.split(" ")[0])) {
          case false:
            current[line.split(" ")[1]] = { parent: current, folder: true };
            break;
          case true: {
            current[line.split(" ")[1]] = {
              size: +line.split(" ")[0],
              file: true,
            };
            break;
          }

          default:
            break;
        }
      }
      default:
        break;
    }
  }
}

let folders: any = {};
let result = 0;

let totalSpace = 70_000_000;
let required = 30_000_000;
function recursiveSum(folder: any, sum = 0) {
  let skipKeys = ["file", "folder", "size", "parent"];
  if (!folder) return 0;
  for (let key in folder) {
    if (skipKeys.includes(key)) continue;
    let element = folder[key];
    if (element.folder) {
      let folderSum = recursiveSum(element, 0);
      result += folderSum < 100000 ? folderSum : 0;
      folders[key] = { size: folderSum };
      sum += folderSum;
    } else if (element.file) {
      sum += element.size;
    }
  }
  return sum;
}

recursiveSum(fileStructure);
let currentUsedSpace = folders["/"].size;
let freeSpace = totalSpace - currentUsedSpace;
let amountToBeDeleted = required - freeSpace;
let smallest = "";
let smallestSize = Infinity;
let smallestValue = Infinity;

folders.test = { size: 24933641 };

for (let key in folders) {
  let newSpace = totalSpace - (currentUsedSpace - folders[key].size);
  if (newSpace >= required) {
    if (smallestSize > newSpace) {
      smallestValue = folders[key].size;
      smallestSize = newSpace;
      smallest = key;
    }
  }
}
console.log({ smallestValue, smallest });

function isCommand(line: string) {
  if (!line) return true;
  return line[0] === "$";
}

function formatCommand(line: string) {
  return line.split(" ").slice(1);
}
