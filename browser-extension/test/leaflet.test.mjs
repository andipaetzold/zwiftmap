import assert from "node:assert/strict";
import test from "node:test";
import { worlds } from "zwift-data";
import { loadModule } from "./load-module.mjs";

async function fixture(map, available = true) {
  let overlays = 0;
  class LeafletMap {
    _leaflet_id = 1;
    static addInitHook() {}
  }
  const instance = map === "legacy" ? new LeafletMap() : map;
  const { initLeaflet } = await loadModule("../leaflet", {
    L: available ? {
      Map: LeafletMap,
      imageOverlay: () => { overlays++; },
      layerGroup: () => ({ addTo() {} })
    } : undefined,
    pageView: { mapContext: () => ({ map: () => instance }) },
    document: { currentScript: { src: "https://extension.test/dist/script.js" } }
  });
  await initLeaflet();
  return overlays;
}

test("native maps are not passed to Leaflet even when its old assets remain loaded", async () => {
  assert.equal(await fixture({ nativeEngine: true }), 0);
});

test("pages without Leaflet do not prevent the native adapter from initializing", async () => {
  assert.equal(await fixture(undefined, false), 0);
});

test("legacy Leaflet maps still receive every configured world image", async () => {
  assert.equal(await fixture("legacy"), worlds.length);
});
