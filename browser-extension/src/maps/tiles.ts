import { worlds } from "zwift-data";
import { getURL } from "../utils";
import { intersects, tileRectangle, worldRectangle } from "./geometry";

const SIZE = 256;
const worldMaps = worlds.map((world) => ({
  ...world,
  rectangle: worldRectangle(world.bounds),
}));

export function createTileRenderer() {
  const images = new Map<string, Promise<HTMLImageElement>>();
  const tiles = new Map<string, Promise<string>>();

  function loadImage(slug: string) {
    let pending = images.get(slug);
    if (!pending) {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = getURL(`../assets/worlds/${slug}.png`);
      pending = image.decode().then(() => image);
      images.set(slug, pending);
      pending.catch(() => images.delete(slug));
      // Avoid retaining every world's large decoded bitmap after travelling between maps.
      if (images.size > 2) images.delete(images.keys().next().value!);
    }
    return pending;
  }

  async function render(quadkey: string) {
    const tile = tileRectangle(quadkey);
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = SIZE;
    const context = canvas.getContext("2d")!;
    context.fillStyle = "#128bc1";
    context.fillRect(0, 0, SIZE, SIZE);
    // World maps are sub-pixel at these levels. Do not decode all worlds for a root tile.
    if (quadkey.length >= 8) {
      for (const world of worldMaps.filter((world) =>
        intersects(world.rectangle, tile),
      )) {
        const image = await loadImage(world.slug);
        const { left, right, top, bottom } = world.rectangle;
        const scale = SIZE * 2 ** quadkey.length;
        context.drawImage(
          image,
          (left - tile.left) * scale,
          (top - tile.top) * scale,
          (right - left) * scale,
          (bottom - top) * scale,
        );
      }
    }
    return canvas.toDataURL("image/png");
  }

  return (quadkey: string) => {
    let pending = tiles.get(quadkey);
    if (!pending) {
      pending = render(quadkey);
      tiles.set(quadkey, pending);
      pending.catch(() => tiles.delete(quadkey));
      if (tiles.size > 128) tiles.delete(tiles.keys().next().value!);
    }
    return pending;
  };
}
