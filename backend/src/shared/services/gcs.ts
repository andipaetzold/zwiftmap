import { Storage } from "@google-cloud/storage";
import { config } from "../config.js";

const storage = new Storage({
  credentials: config.gCloudCredentials,
});

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
          environment: config.environment,
        },
      },
    });
}

export async function createUploadUrl(input: {
  contentType: string;
  contentLength: number;
}): Promise<{ uploadUrl: string; objectId: string }> {
  const objectId = `${Date.now()}`; // TODO: random id
  const file = storage.bucket("uploads.zwiftmap.com").file(objectId);

  const expires = Date.now() + 1 * 60 * 1000;
  const [uploadUrl] = await file.getSignedUrl({
    version: "v4",
    action: "write",
    expires,
    contentType: input.contentType,
    extensionHeaders: {
      "Content-Length": input.contentLength,
    },
  });

  return { uploadUrl, objectId };
}

const EXT_MAP: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
};

export async function savePlaceImage(sourceObjectId: string, placeId: string) {
  const sourceFile = storage
    .bucket("uploads.zwiftmap.com")
    .file(sourceObjectId);
  const [metadata] = await sourceFile.getMetadata();
  const contentType: string = metadata.contentType;
  const ext = EXT_MAP[contentType];

  const targetFile = storage
    .bucket("images.zwiftmap.com")
    .file(`places/${placeId}${ext}`);

  await sourceFile.move(targetFile);

  return targetFile.publicUrl();
}
