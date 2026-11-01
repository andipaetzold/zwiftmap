import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { worlds } from "zwift-data";
import { loadModule } from "./load-module.mjs";

const { contains, intersects, tileRectangle, worldRectangle } =
  await loadModule("geometry");

test("every configured world has a bundled image and valid northwest/southeast bounds", () => {
  for (const world of worlds) {
    assert(existsSync(`assets/worlds/${world.slug}.png`), world.slug);
    const rectangle = worldRectangle(world.bounds);
    assert(
      rectangle.left < rectangle.right && rectangle.top < rectangle.bottom,
      world.slug,
    );
    const [[north, west], [south, east]] = world.bounds;
    assert(contains(world.bounds, (north + south) / 2, (west + east) / 2));
  }
});

test("quadkeys select the correct hemisphere and retain the full-world root", () => {
  assert.equal(
    JSON.stringify(tileRectangle("")),
    JSON.stringify({ left: 0, top: 0, right: 1, bottom: 1 }),
  );
  assert.equal(
    JSON.stringify(tileRectangle("3")),
    JSON.stringify({ left: 0.5, top: 0.5, right: 1, bottom: 1 }),
  );
  assert.equal(
    JSON.stringify(tileRectangle("12")),
    JSON.stringify({ left: 0.5, top: 0.25, right: 0.75, bottom: 0.5 }),
  );
});

test("world selection excludes neighbouring tiles that merely share an edge", () => {
  assert(!intersects(tileRectangle("0"), tileRectangle("1")));
  const watopia = worlds.find((world) => world.slug === "watopia");
  assert(intersects(worldRectangle(watopia.bounds), tileRectangle("3")));
  assert(!intersects(worldRectangle(watopia.bounds), tileRectangle("0")));
});
