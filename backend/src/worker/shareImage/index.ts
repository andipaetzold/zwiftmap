import { Job } from "bull";
import puppeteer from "puppeteer-core";
import { ENVIRONMENT, STATIC_URL } from "../../shared/config";
import { Share } from "../../shared/persistence/share";
import { cloudinary } from "../../shared/services/cloudinary";
import { Logger } from "../services/logger";

export async function handleShareImage(job: Job<Share>, logger: Logger) {
  const share = job.data;

  logger.log(`Processing Share Image`, { jobId: job.id, shareId: share.id });


  logger.log(`puppeteer.launch`);
  const browser = await puppeteer.launch({
    args: PUPPETEER_ARGS,
    // executablePath: "google-chrome-stable",
  });

  logger.log(`browser.newPage`);
  const page = await browser.newPage();
  page.setViewport({ width: 1920, height: 1080 });

  logger.log(`page.goto`);
  await page.goto(STATIC_URL, { waitUntil: "networkidle2" });

  logger.log(`page.screenshot`);
  const imageBuffer = (await page.screenshot()) as Buffer;
  await browser.close();

  logger.log(`Uploading image`);
  await new Promise((resolve, reject) =>
    cloudinary.uploader
      .upload_stream(
        {
          tags: [`env:${ENVIRONMENT}`],
          folder: "shared",
          public_id: share.id,
          overwrite: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      )
      .end(imageBuffer)
  );
}

const PUPPETEER_ARGS = [
  "--autoplay-policy=user-gesture-required",
  "--disable-background-networking",
  "--disable-background-timer-throttling",
  "--disable-backgrounding-occluded-windows",
  "--disable-breakpad",
  "--disable-client-side-phishing-detection",
  "--disable-component-update",
  "--disable-default-apps",
  "--disable-dev-shm-usage",
  "--disable-domain-reliability",
  "--disable-extensions",
  "--disable-features=AudioServiceOutOfProcess",
  "--disable-hang-monitor",
  "--disable-ipc-flooding-protection",
  "--disable-notifications",
  "--disable-offer-store-unmasked-wallet-cards",
  "--disable-popup-blocking",
  "--disable-print-preview",
  "--disable-prompt-on-repost",
  "--disable-renderer-backgrounding",
  "--disable-setuid-sandbox",
  "--disable-speech-api",
  "--disable-sync",
  "--hide-scrollbars",
  "--ignore-gpu-blacklist",
  "--metrics-recording-only",
  "--mute-audio",
  "--no-default-browser-check",
  "--no-first-run",
  "--no-pings",
  "--no-sandbox",
  "--no-zygote",
  "--password-store=basic",
  "--use-gl=swiftshader",
  "--use-mock-keychain",
];
