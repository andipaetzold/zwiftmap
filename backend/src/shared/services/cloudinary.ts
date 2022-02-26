import cloudinary from "cloudinary";
import { CLOUDINARY_CONFIG, ENVIRONMENT } from "../config";

cloudinary.v2.config({
  ...CLOUDINARY_CONFIG,
  secure: true,
});

export async function uploadToCloudinary(
  folder: string,
  filename: string,
  buffer: Buffer
) {
  await new Promise((resolve, reject) =>
    cloudinary.v2.uploader
      .upload_stream(
        {
          tages: [`env:${ENVIRONMENT}`],
          folder,
          public_id: filename,
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
      .end(buffer)
  );
}
