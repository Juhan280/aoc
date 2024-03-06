import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";

const stream = createReadStream("./data.txt", "utf8");
const rl = createInterface(stream);

const re1 = /\d|one|two|three|four|five|six|seven|eight|nine/;
const re2 =
  /(\d|one|two|three|four|five|six|seven|eight|nine).*(\d|one|two|three|four|five|six|seven|eight|nine)/;

const numberMap = Object.fromEntries(
  ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"].map(
    (v, i) => [v, (i + 1).toString()],
  ),
);

/** @type {number[]} */
const numbers = [];

rl.on("line", (line) => {
  let first, last;
  const match = line.match(re2);

  if (match) {
    [, first, last] = match;

    if (!isDigit(first)) first = numberMap[first];
    if (!isDigit(last)) last = numberMap[last];
    else if (!isDigit(first)) first = numberMap[first];
  } else {
    first = line.match(re1)[0];
    if (!isDigit(first)) first = numberMap[first];
    last = first;
  }
  numbers.push(+(first + last));
});

rl.on("close", () => {
  console.log(numbers.reduce((a, c) => a + c));
});

function isDigit(char) {
  return char >= "0" && char <= "9";
}
