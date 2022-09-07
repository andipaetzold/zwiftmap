import { Storage } from "@google-cloud/storage";
import { NODE_ENV } from "../config";

const storage = new Storage();

export async function uploadToGoogleCloudStorage(
  bucket: string,
  filename: string,
  buffer: Buffer
) {
  console.log("Uploading to GCS", { bucket, filename });
  await storage
    .bucket(bucket)
    .file(filename)
    .save(buffer, {
      resumable: false,
      metadata: {
        metadata: {
          environment: NODE_ENV,
        },
      },
    });
}
