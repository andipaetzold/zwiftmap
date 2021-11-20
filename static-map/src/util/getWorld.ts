import { World, worlds } from "zwift-data";

export function getWorld(latlng: [number, number] | null): World | undefined {
  if (!latlng) {
    return;
  }

  return worlds.find((world) => {
    const bb = world.bounds;
    return (
      bb[0][0] >= latlng[0] &&
      latlng[0] >= bb[1][0] &&
      bb[0][1] <= latlng[1] &&
      latlng[1] <= bb[1][1]
    );
  });
}
