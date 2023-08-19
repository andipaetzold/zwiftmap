import { describe, expect, it } from "vitest";
import { routes, worlds } from "zwift-data";
import { createUrl } from "./createUrl";

const worldLondon = worlds.find((w) => w.slug === "london")!;
const routeLondonLoop = routes.find((r) => r.slug === "london-loop")!;

it("default", () => {
  expect(
    createUrl({
      type: "default",
      world: worldLondon,
    }),
  ).toBe("/london");
});

describe("route", () => {
  it("without segments", () => {
    expect(
      createUrl({
        type: "route",
        world: worldLondon,
        route: routeLondonLoop,
      }),
    ).toBe("/london/london-loop");
  });

  it("with segments", () => {
    expect(
      createUrl({
        type: "route",
        world: worldLondon,
        route: routeLondonLoop,
      }),
    ).toBe("/london/london-loop");

    expect(
      createUrl({
        type: "route",
        world: worldLondon,
        route: routeLondonLoop,
      }),
    ).toBe("/london/london-loop");
  });
});

it("strava-activities", () => {
  expect(
    createUrl({
      type: "strava-activities",
      world: worldLondon,
    }),
  ).toBe("/london?list=strava-activities");

  expect(
    createUrl({
      type: "strava-activities",
      world: worldLondon,
    }),
  ).toBe("/london?list=strava-activities");
});

it("strava-activity", () => {
  expect(
    createUrl({
      type: "strava-activity",
      world: worldLondon,
      stravaActivityId: 42,
    }),
  ).toBe("/strava-activities/42");
});

it("events", () => {
  expect(
    createUrl({
      type: "events",
      world: worldLondon,
    }),
  ).toBe("/london?list=events");
});

it("event", () => {
  expect(
    createUrl({
      type: "event",
      world: worldLondon,
      eventId: 42,
      subgroupLabel: null,
    }),
  ).toBe("/events/42");

  expect(
    createUrl({
      type: "event",
      world: worldLondon,
      eventId: 42,
      subgroupLabel: "A",
    }),
  ).toBe("/events/42/A");
});
