import { Share } from "../persistence/index.js";
import { createLatLngStreamImage } from "./latLngStream.js";

export async function createShareImage(
  share: Share,
  resolution: { width: number; height: number }
): Promise<NodeJS.ReadableStream> {
  return await createLatLngStreamImage(share.streams.latlng.data, resolution);
}
