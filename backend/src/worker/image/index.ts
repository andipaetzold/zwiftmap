import { Job } from "bull";
import http from "http";
import https from "https";
import { BACKEND_URL } from "../../shared/config";
import { ImageQueueJobData } from "../../shared/queue";
import { uploadToCloudinary } from "../../shared/services/cloudinary";
import { uploadToGoogleCloudStorage } from "../../shared/services/gcs";
import { Logger } from "../services/logger";

export async function handleImage(job: Job<ImageQueueJobData>, logger: Logger) {
  const { shareId, resolution, cloudinary, googleCloudStorage } = job.data;

  const url = `${BACKEND_URL}/share/${shareId}/image?width=${resolution.width}&height=${resolution.height}`;
  logger.log(`Render image`, { url });

  const httpOrHttps = url.startsWith("https") ? https : http;

  const buffer = await new Promise<Buffer>((resolve) => {
    httpOrHttps.get(url, (response) => {
      const body: Buffer[] = [];
      response
        .on("data", (chunk: Buffer) => {
          body.push(chunk);
        })
        .on("end", () => {
          resolve(Buffer.concat(body));
        });
    });
  });

  if (cloudinary) {
    await uploadToCloudinary(cloudinary.folder, cloudinary.publicId, buffer);
  }

  if (googleCloudStorage) {
    await uploadToGoogleCloudStorage(
      "images.zwiftmap.com",
      googleCloudStorage.filename,
      buffer
    );
  }
}
