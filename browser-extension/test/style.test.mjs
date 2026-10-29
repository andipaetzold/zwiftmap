import assert from "node:assert/strict";
import test from "node:test";
import { loadModule } from "./load-module.mjs";

const { extractStyle, createZwiftStyle, applyStyle } =
  await loadModule("style");
const original = {
  metadata: { strava: { mre: { styling: { "use-vector-textures": true } } } },
  sources: { "client-activities-routes": { type: "vector" } },
  layers: [
    { id: "background", type: "background" },
    { id: "road", type: "line", source: "strava-planet" },
    {
      id: "activity-case SELECTED",
      type: "line",
      source: "client-activities-routes",
    },
    { id: "activity-gradient", type: "line", source: "client-gradient" },
    { id: "marker", type: "symbol", source: "client-points" },
  ],
};

test("image imagery precedes native content without replacing routes or gradients", () => {
  const result = createZwiftStyle(original);
  assert.deepEqual(
    result.layers.map((layer) => layer.id),
    [
      "background",
      "satellite-placeholder",
      "activity-case SELECTED",
      "activity-gradient",
      "marker",
    ],
  );
  assert.deepEqual(result.layers.slice(2), original.layers.slice(2));
  assert.equal(
    original.metadata.strava.mre.styling["use-vector-textures"],
    true,
  );
  assert.equal(
    result.metadata.strava.mre.styling["use-vector-textures"],
    false,
  );
});

test("reapplying a style does not duplicate imagery layers", () => {
  const result = createZwiftStyle(createZwiftStyle(original));
  assert.equal(
    result.layers.filter((layer) => layer.id === "satellite-placeholder")
      .length,
    1,
  );
});

test("archive extraction uses byte offsets rather than character offsets", () => {
  const prefix = new TextEncoder().encode("€");
  const body = new TextEncoder().encode(JSON.stringify(original));
  const bytes = new Uint8Array([...prefix, ...body]);
  const index = `filename:"/assets/Shared/Configs/Test/style.json",start:3,end:${bytes.length}`;
  assert.deepEqual(
    JSON.parse(JSON.stringify(extractStyle(index, bytes.buffer, "Test"))),
    original,
  );
  assert.throws(
    () => extractStyle(index, new ArrayBuffer(1), "Test"),
    /offsets/,
  );
  assert.throws(() => extractStyle("", bytes.buffer, "Test"), /unsupported/);
});

test("native style errors and synchronous binding failures reject cleanly", async () => {
  await assert.rejects(
    applyStyle(
      {
        switchToCustomStyle() {
          throw new Error("binding failed");
        },
      },
      original,
    ),
    /binding failed/,
  );
  await assert.rejects(
    applyStyle(
      {
        switchToCustomStyle(_style, _name, listener) {
          listener.onError("bad style");
        },
      },
      original,
    ),
    /bad style/,
  );
});
