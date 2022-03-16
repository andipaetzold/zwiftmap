import { Job } from "bull";
import { createImage } from "../../shared/image";
import { readShare } from "../../shared/persistence/share";
import { ImageQueueJobData } from "../../shared/queue";
import { uploadToCloudinary } from "../../shared/services/cloudinary";
import { uploadToGoogleCloudStorage } from "../../shared/services/gcs";
import { Logger } from "../services/logger";

export async function handleImage(job: Job<ImageQueueJobData>, logger: Logger) {
  const { shareId, resolution, cloudinary, googleCloudStorage } = job.data;

  const share = await readShare(shareId);
  if (!share) {
    throw new Error(`Could not find share '${shareId}'`);
  }

  logger.info("Creating image", { shareId, resolution });
  const stream = await createImage(share, resolution);

  const buffer = await new Promise<Buffer>((resolve) => {
    const body: Buffer[] = [];
    stream
      .on("data", (chunk: Buffer) => {
        body.push(chunk);
      })
      .on("end", () => {
        resolve(Buffer.concat(body));
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
