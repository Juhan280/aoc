import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";

const stream = createReadStream("./data.txt", "utf8");
const rl = createInterface(stream);

let ans = 0;

rl.on("line", (line) => {
  let [, data] = line.split(": ");
  let max = {
    red: 0,
    green: 0,
    blue: 0,
  };

  for (const round of data.split("; ")) {
    let cubes = Object.fromEntries(
      round.split(", ").map((cubes) => cubes.split(" ").reverse()),
    );

    max.red = Math.max(max.red, +cubes.red || 0);
    max.green = Math.max(max.green, +cubes.green || 0);
    max.blue = Math.max(max.blue, +cubes.blue || 0);
  }

  ans += max.red * max.green * max.blue;
});

rl.on("close", () => {
  console.log(ans);
});
