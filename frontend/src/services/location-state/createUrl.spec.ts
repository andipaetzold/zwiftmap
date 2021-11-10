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
      query: "",
    })
  ).toBe("/london");

  expect(
    createUrl({
      type: "default",
      world: worldLondon,
      query: "query",
    })
  ).toBe("/london?q=query");
});

describe("route", () => {
  it("without segments", () => {
    expect(
      createUrl({
        type: "route",
        world: worldLondon,
        route: routeLondonLoop,
        segments: [],
        query: "",
      })
    ).toBe("/london/london-loop");

    expect(
      createUrl({
        type: "route",
        world: worldLondon,
        route: routeLondonLoop,
        segments: [],
        query: "query",
      })
    ).toBe("/london/london-loop?q=query");
  });

  it("with segments", () => {
    expect(
      createUrl({
        type: "route",
        world: worldLondon,
        route: routeLondonLoop,
        segments: [segmentBoxHill],
        query: "",
      })
    ).toBe("/london/london-loop?segments=box-hill");

    expect(
      createUrl({
        type: "route",
        world: worldLondon,
        route: routeLondonLoop,
        segments: [segmentBoxHill, segmentLondonLoop],
        query: "",
      })
    ).toBe("/london/london-loop?segments=box-hill%2Clondon-loop");
  });
});

it("strava-activities", () => {
  expect(
    createUrl({
      type: "strava-activities",
      world: worldLondon,
      query: "",
    })
  ).toBe("/london?list=strava-activities");

  expect(
    createUrl({
      type: "strava-activities",
      world: worldLondon,
      query: "query",
    })
  ).toBe("/london?list=strava-activities&q=query");
});

it("strava-activity", () => {
  expect(
    createUrl({
      type: "strava-activity",
      world: worldLondon,
      stravaActivityId: "42",
      query: "",
    })
  ).toBe("/strava-activities/42");

  expect(
    createUrl({
      type: "strava-activity",
      world: worldLondon,
      stravaActivityId: "42",
      query: "query",
    })
  ).toBe("/strava-activities/42?q=query");
});

it("events", () => {
  expect(
    createUrl({
      type: "events",
      world: worldLondon,
      query: "",
    })
  ).toBe("/london?list=events");

  expect(
    createUrl({
      type: "events",
      world: worldLondon,
      query: "query",
    })
  ).toBe("/london?list=events&q=query");
});

it("event", () => {
  expect(
    createUrl({
      type: "event",
      world: worldLondon,
      eventId: "42",
      query: "",
    })
  ).toBe("/events/42");

  expect(
    createUrl({
      type: "event",
      world: worldLondon,
      eventId: "42",
      query: "query",
    })
  ).toBe("/events/42?q=query");
});
