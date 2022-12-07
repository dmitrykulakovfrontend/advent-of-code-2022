import fs from "fs";
const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
let example = `$ cd /
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
let fileStructure = {
  "/": { folder: true },
};
let current: any = fileStructure;

const isCommand = (line: string) => (line ? line[0] === "$" : true);
const formatCommand = (line: string) => line.split(" ").slice(1);

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  if (isCommand(line)) {
    let [type, value] = formatCommand(line);
    if (type === "cd") {
      if (value === "..") {
        current = current.parent;
      } else {
        current = current[value];
      }
      continue;
    } else if (type === "ls") {
      // skip ls command
      i += 1;
      line = lines[i];

      while (!isCommand(line)) {
        if (!current) throw new Error("Something went wrong");
        // split "dir a" to ["dir", "a"]
        let [size, name] = line.split(" ");
        // we are trying to convert first part to integer, and if it is, then it means that we have file
        let isFile = Number.isInteger(+size);
        if (isFile) {
          current[name] = {};
          // defineProperty is same like example below, except that by setting enumerable to false we are
          // not going to iterate over them, it is just better than later make check if (key == "parent") continue
          // current[name] = {
          //   size: +size,
          //   file: true,
          // };
          Object.defineProperty(current[name], "size", {
            value: +size,
            enumerable: false,
          });
          Object.defineProperty(current[name], "file", {
            value: true,
            enumerable: false,
          });
        } else {
          current[name] = {};
          Object.defineProperty(current[name], "parent", {
            value: current,
            enumerable: false,
          });
          Object.defineProperty(current[name], "folder", {
            value: true,
            enumerable: false,
          });
          // current[name] = { parent: current, folder: true };
        }
        i += 1;
        line = lines[i];
      }
      // if we dont reduce i by 1, then it is going to skip next command because i at the end of lopp increments
      i -= 1;
    }
  }
}

let part1Result = 0;

let folders: any = {};
let totalSpace = 70_000_000;
let required = 30_000_000;
function recursiveSum(folder: any, sum = 0) {
  for (let key in folder) {
    let element = folder[key];
    if (element.folder) {
      // recursively calculate the sum of folder by starting from 0;
      let folderSum = recursiveSum(element, 0);
      // if sum less 100000 add this folder sum to result
      part1Result += folderSum < 100000 ? folderSum : 0;
      // add this folder to all folders list
      folders[key] = { size: folderSum };
      sum += folderSum;
    } else if (element.file) {
      sum += element.size;
    }
  }
  return sum;
}

recursiveSum(fileStructure);

console.log({ part1Result });

let currentUsedSpace = folders["/"].size;
let smallestDirectory = {
  name: "",
  size: Infinity,
  newFreeSpace: Infinity,
};

for (let key in folders) {
  let folderSize = folders[key].size;
  let newSpace = totalSpace - (currentUsedSpace - folderSize);
  if (newSpace >= required) {
    if (smallestDirectory.newFreeSpace > newSpace) {
      smallestDirectory.size = folderSize;
      smallestDirectory.newFreeSpace = newSpace;
      smallestDirectory.name = key;
    }
  }
}

let part2Result = smallestDirectory.size;

console.log({ part2Result });
