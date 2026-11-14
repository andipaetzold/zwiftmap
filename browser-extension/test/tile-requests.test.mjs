import assert from "node:assert/strict";
import { webcrypto } from "node:crypto";
import test from "node:test";
import { loadModule } from "./load-module.mjs";

class FakeXHR {
  responseType = "arraybuffer";
  timeout = 123;
  withCredentials = true;
  opens = [];
  sent = [];
  events = [];
  open(...args) {
    this.opens.push(args);
    this.responseType = "";
    this.timeout = 0;
    this.withCredentials = false;
  }
  send(body) {
    this.sent.push(body);
  }
  abort() {
    this.events.push("abort");
  }
  dispatchEvent(event) {
    this.events.push(event.type);
  }
}

const { registerTileProvider } = await loadModule("tile-requests", {
  XMLHttpRequest: FakeXHR,
  crypto: webcrypto,
  location: { origin: "https://www.strava.com" },
  ProgressEvent: class {
    constructor(type) {
      this.type = type;
    }
  },
});
const flush = () => new Promise((resolve) => setImmediate(resolve));
const open = FakeXHR.prototype.open;

test("unrelated requests preserve their URL, method and body", () => {
  const provider = registerTileProvider(async () => "data:tile");
  const xhr = new FakeXHR();
  xhr.open("POST", "https://www.strava.com/other", true);
  xhr.send("unchanged");
  assert.deepEqual(xhr.opens, [["POST", "https://www.strava.com/other", true]]);
  assert.deepEqual(xhr.sent, ["unchanged"]);
  provider.dispose();
  assert.equal(FakeXHR.prototype.open, open);
});

test("asynchronous tiles keep response settings and never send the placeholder request", async () => {
  const provider = registerTileProvider(async (key) => `data:${key}`);
  const xhr = new FakeXHR();
  xhr.open("GET", provider.template.replace("{quadkey}", "312"), true);
  Object.assign(xhr, {
    responseType: "arraybuffer",
    timeout: 123,
    withCredentials: true,
  });
  xhr.send();
  assert.equal(xhr.sent.length, 0);
  await flush();
  assert.deepEqual(xhr.opens[1], ["GET", "data:312", true]);
  assert.equal(xhr.responseType, "arraybuffer");
  assert.equal(xhr.timeout, 123);
  assert.equal(xhr.withCredentials, true);
  assert.equal(xhr.sent.length, 1);
  provider.dispose();
});

test("aborting a tile while an image decodes prevents it being sent later", async () => {
  let finish;
  const provider = registerTileProvider(
    () =>
      new Promise((resolve) => {
        finish = resolve;
      }),
  );
  const xhr = new FakeXHR();
  xhr.open("GET", provider.template.replace("{quadkey}", "3"), true);
  xhr.send();
  xhr.abort();
  finish("data:tile");
  await flush();
  assert.equal(xhr.opens.length, 1);
  assert.equal(xhr.sent.length, 0);
  provider.dispose();
});

test("image errors reach the native loader and multiple providers dispose independently", async () => {
  const first = registerTileProvider(async () => {
    throw new Error("image failed");
  });
  const second = registerTileProvider(async () => "data:second");
  const xhr = new FakeXHR();
  xhr.open("GET", first.template.replace("{quadkey}", "0"), true);
  xhr.send();
  await flush();
  assert.deepEqual(xhr.events, ["abort", "error"]);
  first.dispose();
  const next = new FakeXHR();
  next.open("GET", second.template.replace("{quadkey}", "1"), true);
  next.send();
  await flush();
  assert.equal(next.opens[1][1], "data:second");
  second.dispose();
  assert.equal(FakeXHR.prototype.open, open);
});
