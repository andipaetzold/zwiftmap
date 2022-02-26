import { Job } from "bull";
import puppeteer from "puppeteer";
import { URL } from "url";
import { STATIC_URL } from "../../shared/config";
import { ImageQueueJobData } from "../../shared/queue";
import { uploadToCloudinary } from "../../shared/services/cloudinary";
import { uploadToGoogleCloudStorage } from "../../shared/services/gcp";
import { Logger } from "../services/logger";

export async function handleImage(job: Job<ImageQueueJobData>, logger: Logger) {
  const { path, resolution, cloudinary, googleCloudStorage } = job.data;

  logger.log(`Render image`, { path });
  const browser = await puppeteer.launch({ args: PUPPETEER_ARGS });
  const page = await browser.newPage();
  page.setViewport(resolution);
  await page.goto(new URL(path, STATIC_URL).toString(), {
    waitUntil: "networkidle0",
  });
  const imageBuffer = (await page.screenshot()) as Buffer;
  await browser.close();

  logger.log(`Uploading image`, { path });
  if (cloudinary) {
    await uploadToCloudinary(
      cloudinary.folder,
      cloudinary.publicId,
      imageBuffer
    );
  }
  if (googleCloudStorage) {
    await uploadToGoogleCloudStorage(
      "images.zwiftmap.com",
      googleCloudStorage.filename,
      imageBuffer
    );
  }
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
