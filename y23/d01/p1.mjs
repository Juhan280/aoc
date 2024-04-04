import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";

const stream = createReadStream("../../inputs/y23/d01.txt", "utf8");
const rl = createInterface(stream);

/** @type {number[]} */
const numbers = []

rl.on("line", (line) => {
  const { length } = line;
  let first, last;

  for (let i = 0; i < length; i++) {
    const char = line[i];
    if (isDigit(char)) {
      first = char;
      break;
    }
  }

  for (let i = length - 1; i >= 0; i--) {
    const char = line[i];
    if (isDigit(char)) {
      last = char;
      break;
    }
  }

  numbers.push(+(first + last))
});

rl.on("close", () => console.log(numbers.reduce((a, c) => a + c)))

function isDigit(char) {
  return char >= "0" && char <= "9";
}
