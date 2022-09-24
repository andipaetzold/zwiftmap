import { http } from "@google-cloud/functions-framework";
import { Storage } from "@google-cloud/storage";
import axios from "axios";

const storage = new Storage();

/**
 * TODO: move to shared package
 */
interface ImageQueueData {
  type: "share";
  shareId: string;

  resolution: { width: number; height: number };
  googleCloudStorage?: {
    filename: string;
  };
}

http("createImage", async (req, res) => {
  const { shareId, resolution, googleCloudStorage } =
    req.body as ImageQueueData;

  if (!googleCloudStorage) {
    res.sendStatus(200);
    return;
  }

  const url = `https://api2.zwiftmap.com/share/${shareId}/image?width=${resolution.width}&height=${resolution.height}`;
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });

  await storage
    .bucket("images.zwiftmap.com")
    .file(googleCloudStorage.filename)
    .save(response.data, {
      resumable: false,
      metadata: {
        metadata: {
          environment: process.env.GCLOUD_PROJECT
            ? "production"
            : "development",
        },
      },
    });

  res.sendStatus(200);
});
