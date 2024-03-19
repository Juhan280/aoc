import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";

const stream = createReadStream("./data.txt", "utf8");
const rl = createInterface(stream);

const constraints = {
  red: 12,
  green: 13,
  blue: 14,
};

let ans = 0;

rl.on("line", (line) => {
  let [game, data] = line.split(": ");
  let possible = true;

  for (const round of data.split("; ")) {
    let cubes = Object.fromEntries(
      round.split(", ").map((cubes) => cubes.split(" ").reverse()),
    );

    if (
      +cubes.red > constraints.red ||
      +cubes.green > constraints.green ||
      +cubes.blue > constraints.blue
    ) {
      possible = false;
      break;
    }
  }

  if (possible) ans += +game.split(" ")[1];
});

rl.on("close", () => {
  console.log(ans);
});
