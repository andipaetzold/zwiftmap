import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apkFolder = process.argv[2];

if (!apkFolder) {
  throw new Error("APK Folder must be passed as argument");
}

if (!fs.existsSync(apkFolder)) {
  throw new Error("APK Folder does not exist");
}

const mapsFolder = path.resolve(apkFolder, "assets", "maps");

const outputFolder = path.resolve(__dirname, "..", "src/maps");

const maps = [
  {
    folder: "bologna",
    x: 16,
    y: 16,
    filename: "bologna",
    rotate: 0,
  },
  {
    folder: "critcity",
    x: 8,
    y: 8,
    filename: "crit-city",
    rotate: 0,
  },
  {
    folder: "france",
    x: 24,
    y: 24,
    filename: "france",
    rotate: -90,
  },
  {
    folder: "innsbruck",
    x: 16,
    y: 16,
    filename: "innsbruck",
    rotate: 0,
  },
  {
    folder: "london",
    x: 16,
    y: 16,
    filename: "london",
    rotate: 0,
  },
  {
    folder: "makuriislands",
    x: 16,
    y: 16,
    filename: "makuri-islands",
    rotate: -90,
  },
  {
    folder: "newyork",
    x: 16,
    y: 16,
    filename: "new-york",
    rotate: 0,
  },
  {
    folder: "paris",
    x: 16,
    y: 16,
    filename: "paris",
    rotate: -90,
  },
  {
    folder: "richmond",
    x: 16,
    y: 16,
    filename: "richmond",
    rotate: 0,
  },
  {
    folder: "watopia",
    x: 32,
    y: 16,
    filename: "watopia",
    rotate: 0,
  },
  {
    folder: "yorkshire",
    x: 16,
    y: 16,
    filename: "yorkshire",
    rotate: 0,
  },
];

for (const map of maps) {
  console.log(map.filename);
  const mapFolder = path.resolve(mapsFolder, map.folder, "1x");
  const outFile = path.resolve(outputFolder, `${map.filename}`);

  const montageArgs = [];
  for (let i = 0; i < map.y; ++i) {
    for (let j = 0; j < map.x; ++j) {
      montageArgs.push(`${j}-${i}.jpg`);
    }
  }

  montageArgs.push("-geometry", "+0+0");
  montageArgs.push("-tile", `${map.x}x${map.y}`);
  montageArgs.push(outFile);

  spawnSync("montage", montageArgs, {
    cwd: mapFolder,
    stdio: "inherit",
  });

  const convertArgs = [];
  convertArgs.push(outFile);
  convertArgs.push("-rotate", map.rotate);
  convertArgs.push(outFile);

  spawnSync("convert", convertArgs, {
    stdio: "inherit",
  });
}
