import { Storage } from "@google-cloud/storage";

const storage = new Storage();

export async function uploadToGoogleCloudStorage(
  bucket: string,
  filename: string,
  buffer: Buffer
) {
  await storage.bucket(bucket).file(filename).save(buffer, {
    resumable: false,
  });
}
