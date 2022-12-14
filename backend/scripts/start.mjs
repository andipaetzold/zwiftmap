import { spawn } from "child_process";
import "dotenv/config";
import ngrok from "ngrok";
import { TscWatchClient } from "tsc-watch/client.js";

const url = await ngrok.connect({
  proto: "http",
  region: "eu",
  addr: process.env.PORT,
});

console.log(`ngrok tunnel opened at: ${url}`);
console.log("Open the ngrok dashboard at: http://localhost:4040");

const watch = new TscWatchClient();

let childProcess;
function killChildProcess() {
  if (childProcess) {
    childProcess.kill("SIGINT");
    childProcess = undefined;
  }
}

watch.on("success", () => {
  killChildProcess();

  childProcess = spawn(`node`, ["./build/web"], {
    stdio: "inherit",
    env: {
      ...process.env,
      STRAVA_WEBHOOK_HOST: url,
    },
  });
});

watch.on("compile_errors", () => {
  killChildProcess();
});

watch.start("--preserveWatchOutput");
