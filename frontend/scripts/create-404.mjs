import { copyFileSync, existsSync, unlinkSync } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathIndex = path.resolve(__dirname, "../build/index.html");
const path404 = path.resolve(__dirname, "../build/404.html");

if (existsSync(path404)) {
  unlinkSync(path404);
}

console.log("Copying index.html to 404.html");
copyFileSync(pathIndex, path404);
