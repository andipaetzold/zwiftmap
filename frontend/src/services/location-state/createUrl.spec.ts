import { routes, segments, worlds } from "zwift-data";
import { createUrl } from "./createUrl";

const worldLondon = worlds.find((w) => w.slug === "london")!;
const routeLondonLoop = routes.find((r) => r.slug === "london-loop")!;
const segmentBoxHill = segments.find((s) => s.slug === "box-hill")!;
const segmentLondonLoop = segments.find((s) => s.slug === "london-loop")!;

it("default", () => {
  expect(
    createUrl({
      type: "default",
      world: worldLondon,
    })
  ).toBe("/london");
});

describe("route", () => {
  it("without segments", () => {
    expect(
      createUrl({
        type: "route",
        world: worldLondon,
        route: routeLondonLoop,
        segments: [],
      })
    ).toBe("/london/london-loop");
  });

  it("with segments", () => {
    expect(
      createUrl({
        type: "route",
        world: worldLondon,
        route: routeLondonLoop,
        segments: [segmentBoxHill],
      })
    ).toBe("/london/london-loop?segments=box-hill");

    expect(
      createUrl({
        type: "route",
        world: worldLondon,
        route: routeLondonLoop,
        segments: [segmentBoxHill, segmentLondonLoop],
      })
    ).toBe("/london/london-loop?segments=box-hill%2Clondon-loop");
  });
});

it("strava-activities", () => {
  expect(
    createUrl({
      type: "strava-activities",
      world: worldLondon,
    })
  ).toBe("/london?list=strava-activities");

  expect(
    createUrl({
      type: "strava-activities",
      world: worldLondon,
    })
  ).toBe("/london?list=strava-activities");
});

it("strava-activity", () => {
  expect(
    createUrl({
      type: "strava-activity",
      world: worldLondon,
      stravaActivityId: 42,
    })
  ).toBe("/strava-activities/42");
});

it("events", () => {
  expect(
    createUrl({
      type: "events",
      world: worldLondon,
    })
  ).toBe("/london?list=events");
});

it("event", () => {
  expect(
    createUrl({
      type: "event",
      world: worldLondon,
      eventId: "42",
    })
  ).toBe("/events/42");
});
