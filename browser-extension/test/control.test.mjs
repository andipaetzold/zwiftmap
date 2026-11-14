import assert from "node:assert/strict";
import test from "node:test";
import { loadModule } from "./load-module.mjs";

async function fixture({ fail = false, virtual = true } = {}) {
  const calls = [];
  let clone;
  let template = "original-satellite-url";
  class Select {
    value = "5";
    style = { display: "inline-block" };
    dataset = {};
    listeners = new Map();
    cloneNode() {
      return (clone = new Select());
    }
    append(option) {
      this.option = option;
    }
    after() {}
    addEventListener(type, listener) {
      this.listeners.set(type, listener);
    }
    removeEventListener(type) {
      this.listeners.delete(type);
    }
    dispatchEvent() {
      calls.push(["builtin", this.value, template]);
    }
    remove() {
      this.removed = true;
    }
    change(value) {
      this.value = value;
      return this.listeners.get("change")();
    }
  }
  const original = new Select();
  const target = {
    lookAtPoint: { latitude: -11.65, longitude: 166.9 },
    distance: 1234,
    pitch: 0,
    bearing: 25,
  };
  const engine = {
    getCamera: () => ({
      getTarget: () => target,
      flyToTarget: (value) => calls.push(["camera", value]),
    }),
    getTileSources: () => ({
      getTileSources: () => [{ name: "summer-imagery", templateUrl: template }],
      setTileSourceTemplateUrl: (_name, url) => {
        template = url;
        calls.push(["template", url]);
      },
    }),
    getDebugApi: () => ({ clearCache: () => calls.push(["clear-cache"]) }),
  };
  const { addMapControl } = await loadModule(
    "control",
    {
      pageView: {
        _activity: {
          attributes: { detailedType: virtual ? "VirtualRide" : "Ride" },
        },
      },
      Option: class {
        constructor(text, value) {
          this.text = text;
          this.value = value;
        }
      },
      Event: class {},
      console: { warn: () => calls.push(["warning"]) },
      load: async () => {
        if (fail) throw new Error("unavailable");
        return {};
      },
      apply: async () => calls.push(["apply"]),
      provider: () => ({
        template: "local-tiles/{quadkey}.png",
        dispose: () => calls.push(["dispose"]),
      }),
    },
    {
      "./style":
        "export const loadZwiftStyle = (...args) => load(...args); export const applyStyle = (...args) => apply(...args);",
      "./tiles": "export const createTileRenderer = () => () => {};",
      "./tile-requests":
        "export const registerTileProvider = () => provider();",
    },
  );
  const dispose = addMapControl({
    canvas: { isConnected: true },
    select: original,
    engine,
    version: "34.1.0",
  });
  return { original, clone, calls, dispose };
}
const flush = () => new Promise((resolve) => setImmediate(resolve));

test("Zwift is separate from built-in options, preserves the camera and invalidates native caches", async () => {
  const { original, clone, calls, dispose } = await fixture();
  await flush();
  assert.equal(clone.value, "zwift");
  assert.equal(original.value, "5");
  assert(calls.some((call) => call[0] === "clear-cache"));
  assert.deepEqual(
    calls.find((call) => call[0] === "camera"),
    [
      "camera",
      {
        lookAtPoint: { latitude: -11.65, longitude: 166.9 },
        distance: 1234,
        pitch: 0,
        bearing: 25,
      },
    ],
  );
  await clone.change("9");
  assert.deepEqual(
    calls.find((call) => call[0] === "builtin"),
    ["builtin", "9", "original-satellite-url"],
  );
  assert.equal(calls.filter((call) => call[0] === "clear-cache").length, 2);
  await clone.change("zwift");
  await clone.change("8");
  assert(
    calls.some(
      (call) =>
        call[0] === "builtin" &&
        call[1] === "8" &&
        call[2] === "original-satellite-url",
    ),
  );
  dispose();
  assert.equal(original.style.display, "inline-block");
  assert.equal(clone.removed, true);
  assert(calls.some((call) => call[0] === "dispose"));
});

test("real activities keep their built-in map until Zwift is explicitly selected", async () => {
  const { clone, calls, dispose } = await fixture({ virtual: false });
  await flush();
  assert.equal(clone.value, "5");
  assert.equal(calls.length, 0);
  await clone.change("9");
  assert(!calls.some((call) => call[0] === "clear-cache"));
  dispose();
});

test("asset failures restore the built-in selector and leave it usable", async () => {
  const { clone, calls, dispose } = await fixture({ fail: true });
  await flush();
  assert.equal(clone.value, "5");
  assert.equal(clone.disabled, false);
  assert(calls.some((call) => call[0] === "warning"));
  assert(calls.some((call) => call[0] === "builtin" && call[1] === "5"));
  dispose();
});

test("removing a map during initialization prevents late style application", async () => {
  const { calls, dispose } = await fixture();
  dispose();
  await flush();
  assert(!calls.some((call) => call[0] === "apply"));
});
