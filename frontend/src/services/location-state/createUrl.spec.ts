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
    ).toBe("/london?route=london-loop");

    expect(
      createUrl({
        type: "route",
        world: worldLondon,
        route: routeLondonLoop,
        segments: [],
        query: "query",
      })
    ).toBe("/london?route=london-loop&q=query");
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
    ).toBe("/london?route=london-loop&segments=box-hill");

    expect(
      createUrl({
        type: "route",
        world: worldLondon,
        route: routeLondonLoop,
        segments: [segmentBoxHill, segmentLondonLoop],
        query: "",
      })
    ).toBe("/london?route=london-loop&segments=box-hill%2Clondon-loop");
  });
});

it("strava-activities", () => {
  expect(
    createUrl({
      type: "strava-activities",
      world: worldLondon,
      query: "",
    })
  ).toBe("/london?strava-activities=");

  expect(
    createUrl({
      type: "strava-activities",
      world: worldLondon,
      query: "query",
    })
  ).toBe("/london?strava-activities=&q=query");
});

it("strava-activity", () => {
  expect(
    createUrl({
      type: "strava-activity",
      world: worldLondon,
      stravaActivityId: "42",
      query: "",
    })
  ).toBe("/london?strava-activity=42");

  expect(
    createUrl({
      type: "strava-activity",
      world: worldLondon,
      stravaActivityId: "42",
      query: "query",
    })
  ).toBe("/london?strava-activity=42&q=query");
});

it("events", () => {
  expect(
    createUrl({
      type: "events",
      world: worldLondon,
      query: "",
    })
  ).toBe("/london?events=");

  expect(
    createUrl({
      type: "events",
      world: worldLondon,
      query: "query",
    })
  ).toBe("/london?events=&q=query");
});

it("event", () => {
  expect(
    createUrl({
      type: "event",
      world: worldLondon,
      eventId: "42",
      query: "",
    })
  ).toBe("/london?event=42");

  expect(
    createUrl({
      type: "event",
      world: worldLondon,
      eventId: "42",
      query: "query",
    })
  ).toBe("/london?event=42&q=query");
});
