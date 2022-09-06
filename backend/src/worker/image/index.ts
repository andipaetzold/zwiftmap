import { createImage } from "../../shared/image";
import { readShare } from "../../shared/persistence/share";
import { uploadToGoogleCloudStorage } from "../../shared/services/gcs";
import { ImageQueueData, Logger } from "../../shared/types";

export async function handleImage(
  { shareId, resolution, googleCloudStorage }: ImageQueueData,
  logger: Logger
) {
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

  if (googleCloudStorage) {
    await uploadToGoogleCloudStorage(
      "images.zwiftmap.com",
      googleCloudStorage.filename,
      buffer
    );
  }
}
