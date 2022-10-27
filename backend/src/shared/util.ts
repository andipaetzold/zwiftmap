import { World, worlds } from "zwift-data";
import { DetailedActivity, SummaryActivity } from "./services/strava/index.js";
import { LatLng } from "./types.js";

export function isZwiftActivity(
  activity: DetailedActivity | SummaryActivity
): boolean {
  if (!["VirtualRun", "VirtualRide"].includes(activity.type)) {
    return false;
  }

  // device_name can be 'Zwift' or 'Zwift Run'
  if ("device_name" in activity && !activity.device_name.includes("Zwift")) {
    return false;
  }

  const world = getWorldFromActivity(activity);

  if (world === undefined) {
    return false;
  }

  return true;
}

export function getWorldFromActivity(activity: {
  start_latlng: LatLng;
}): World | undefined {
  if (!activity.start_latlng) {
    return undefined;
  }

  return getWorld(activity.start_latlng);
}

export function getWorld(latLng: LatLng): World | undefined {
  return worlds.find((world) => {
    const bb = world.bounds;
    return (
      bb[0][0] >= latLng[0] &&
      latLng[0] >= bb[1][0] &&
      bb[0][1] <= latLng[1] &&
      latLng[1] <= bb[1][1]
    );
  });
}

export function diff(a: number, b: number) {
  return Math.abs(a - b);
}

export function bufferToDataUrl(buffer: Buffer, mime = "image/png"): string {
  const encoding = "base64";
  const data = buffer.toString(encoding);
  return `data:${mime};${encoding},${data}`;
}
