import assert from "node:assert/strict";
import test from "node:test";
import { worlds } from "zwift-data";
import { loadModule } from "./load-module.mjs";

function keyAt(latitude, longitude, zoom = 12) {
  const count = 2 ** zoom;
  const x = Math.floor(((longitude + 180) / 360) * count);
  const y = Math.floor(
    ((1 - Math.asinh(Math.tan((latitude * Math.PI) / 180)) / Math.PI) / 2) *
      count,
  );
  return Array.from({ length: zoom }, (_, i) => {
    const bit = zoom - i - 1;
    return String(((x >> bit) & 1) + 2 * ((y >> bit) & 1));
  }).join("");
}

test("world images load lazily, composite in their own bounds and reuse rendered tiles", async () => {
  const decoded = [];
  const painted = [];
  let canvases = 0;
  const { createTileRenderer } = await loadModule(
    "tiles",
    {
      Image: class {
        async decode() {
          decoded.push(this.src);
        }
      },
      document: {
        createElement() {
          canvases++;
          return {
            getContext: () => ({
              fillRect() {},
              drawImage: (image, ...rect) => painted.push([image.src, ...rect]),
            }),
            toDataURL: () => "data:tile",
          };
        },
      },
    },
    { "../utils": "export const getURL = path => path;" },
  );
  const render = createTileRenderer();
  await render("");
  assert.equal(decoded.length, 0);
  for (const slug of ["watopia", "london"]) {
    const [[north, west], [south, east]] = worlds.find(
      (world) => world.slug === slug,
    ).bounds;
    const key = keyAt((north + south) / 2, (west + east) / 2);
    await render(key);
    const count = canvases;
    await render(key);
    assert.equal(canvases, count);
    const rect = painted.find(([src]) => src.includes(slug));
    assert(rect, slug);
    assert(rect.slice(1).every(Number.isFinite));
    assert(rect[3] > 0 && rect[4] > 0);
  }
  assert.deepEqual(
    decoded.map((src) => src.split("/").pop()),
    ["watopia.png", "london.png"],
  );
});
