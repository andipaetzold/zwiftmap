import { routes, segments, worlds } from "zwift-data";
import {
  LocationStateRoute,
  LocationStateStravaActivities,
  LocationStateStravaActivity,
  LocationStateUpcomingEvent,
  LocationStateUpcomingEvents,
} from ".";
import { getLocationStateFromUrl } from "./getLocationStateFromUrl";

const WATOPIA = worlds.find((w) => w.slug === "watopia");
const LONDON = worlds.find((w) => w.slug === "london");

const LONDON_CLASSIQUE = routes.find((r) => r.slug === "london-classique");

const LONDON_SPRINT = segments.find((s) => s.slug === "london-sprint");

describe("default", () => {
  describe("current", () => {
    it("valid world", () => {
      const r1 = getLocationStateFromUrl("/", "");
      expect(r1.type).toBe("default");
      expect(r1.world).toBe(WATOPIA);
      expect(r1.query).toBe("");

      const r2 = getLocationStateFromUrl("/", "q=query");
      expect(r2.type).toBe("default");
      expect(r2.world).toBe(WATOPIA);
      expect(r2.query).toBe("query");

      const r3 = getLocationStateFromUrl("/london", "q=query");
      expect(r3.type).toBe("default");
      expect(r3.world).toBe(LONDON);
      expect(r3.query).toBe("query");
    });

    it("invalid world", () => {
      const r1 = getLocationStateFromUrl("/test", "q=query");
      expect(r1.type).toBe("default");
      expect(r1.world).toBe(WATOPIA);
      expect(r1.query).toBe("query");
    });
  });

  describe("legacy", () => {
    it("valid world", () => {
      const r1 = getLocationStateFromUrl("/", "world=london");
      expect(r1.type).toBe("default");
      expect(r1.world).toBe(LONDON);
      expect(r1.query).toBe("");

      const r2 = getLocationStateFromUrl("/", "world=london&q=query");
      expect(r2.type).toBe("default");
      expect(r2.world).toBe(LONDON);
      expect(r2.query).toBe("query");
    });

    it("invalid world", () => {
      const r1 = getLocationStateFromUrl("/", "world=test&q=query");
      expect(r1.type).toBe("default");
      expect(r1.world).toBe(WATOPIA);
      expect(r1.query).toBe("query");
    });
  });
});

describe("route", () => {
  describe("current", () => {
    it("correct world", () => {
      const r1 = getLocationStateFromUrl(
        "/london/london-classique",
        ""
      ) as LocationStateRoute;
      expect(r1.type).toBe("route");
      expect(r1.world).toBe(LONDON);
      expect(r1.route).toBe(LONDON_CLASSIQUE);
      expect(r1.segments).toStrictEqual([]);
      expect(r1.query).toBe("");

      const r2 = getLocationStateFromUrl(
        "/watopia/london-classique",
        ""
      ) as LocationStateRoute;
      expect(r2.type).toBe("route");
      expect(r2.world).toBe(LONDON);
      expect(r2.route).toBe(LONDON_CLASSIQUE);
      expect(r2.segments).toStrictEqual([]);
      expect(r2.query).toBe("");

      const r3 = getLocationStateFromUrl(
        "/watopia/london-classique",
        "q=query"
      ) as LocationStateRoute;
      expect(r3.type).toBe("route");
      expect(r3.world).toBe(LONDON);
      expect(r3.route).toBe(LONDON_CLASSIQUE);
      expect(r3.segments).toStrictEqual([]);
      expect(r3.query).toBe("query");
    });

    it("wrong world", () => {
      const r1 = getLocationStateFromUrl(
        "/watopia/london-classique",
        "segments=london-sprint&q=query"
      ) as LocationStateRoute;
      expect(r1.type).toBe("route");
      expect(r1.world).toBe(LONDON);
      expect(r1.route).toBe(LONDON_CLASSIQUE);
      expect(r1.segments).toStrictEqual([LONDON_SPRINT]);
      expect(r1.query).toBe("query");
    });

    it("invalid world", () => {
      const r1 = getLocationStateFromUrl(
        "/test/london-classique",
        "segments=london-sprint&q=query"
      ) as LocationStateRoute;
      expect(r1.type).toBe("route");
      expect(r1.world).toBe(LONDON);
      expect(r1.route).toBe(LONDON_CLASSIQUE);
      expect(r1.segments).toStrictEqual([LONDON_SPRINT]);
      expect(r1.query).toBe("query");
    });
  });

  describe("legacy", () => {
    it("correct world", () => {
      const r1 = getLocationStateFromUrl(
        "/london",
        "route=london-classique"
      ) as LocationStateRoute;
      expect(r1.type).toBe("route");
      expect(r1.world).toBe(LONDON);
      expect(r1.route).toBe(LONDON_CLASSIQUE);
      expect(r1.segments).toStrictEqual([]);
      expect(r1.query).toBe("");

      const r2 = getLocationStateFromUrl(
        "/",
        "world=london&route=london-classique"
      ) as LocationStateRoute;
      expect(r2.type).toBe("route");
      expect(r2.world).toBe(LONDON);
      expect(r2.route).toBe(LONDON_CLASSIQUE);
      expect(r2.segments).toStrictEqual([]);
      expect(r2.query).toBe("");
    });

    it("wrong world", () => {
      const r1 = getLocationStateFromUrl(
        "/watopia",
        "route=london-classique"
      ) as LocationStateRoute;
      expect(r1.type).toBe("route");
      expect(r1.world).toBe(LONDON);
      expect(r1.route).toBe(LONDON_CLASSIQUE);
      expect(r1.segments).toStrictEqual([]);
      expect(r1.query).toBe("");
    });

    it("invalid world", () => {
      const r1 = getLocationStateFromUrl(
        "/test",
        "route=london-classique"
      ) as LocationStateRoute;
      expect(r1.type).toBe("route");
      expect(r1.world).toBe(LONDON);
      expect(r1.route).toBe(LONDON_CLASSIQUE);
      expect(r1.segments).toStrictEqual([]);
      expect(r1.query).toBe("");
    });
  });
});

describe("event", () => {
  it("current", () => {
    const r1 = getLocationStateFromUrl(
      "/events/42",
      ""
    ) as LocationStateUpcomingEvent;
    expect(r1.type).toBe("event");
    expect(r1.world).toBeNull();
    expect(r1.eventId).toBe("42");
    expect(r1.query).toBe("");

    const r2 = getLocationStateFromUrl(
      "/events/42",
      "q=query"
    ) as LocationStateUpcomingEvent;
    expect(r2.type).toBe("event");
    expect(r2.world).toBeNull();
    expect(r2.eventId).toBe("42");
    expect(r2.query).toBe("query");
  });

  it("legacy", () => {
    const r1 = getLocationStateFromUrl(
      "/",
      "event=42"
    ) as LocationStateUpcomingEvent;
    expect(r1.type).toBe("event");
    expect(r1.world).toBeNull();
    expect(r1.eventId).toBe("42");
    expect(r1.query).toBe("");

    const r2 = getLocationStateFromUrl(
      "/london",
      "event=42"
    ) as LocationStateUpcomingEvent;
    expect(r2.type).toBe("event");
    expect(r2.world).toBeNull();
    expect(r2.eventId).toBe("42");
    expect(r2.query).toBe("");

    const r3 = getLocationStateFromUrl(
      "/london",
      "event=42&q=query"
    ) as LocationStateUpcomingEvent;
    expect(r3.type).toBe("event");
    expect(r3.world).toBeNull();
    expect(r3.eventId).toBe("42");
    expect(r3.query).toBe("query");
  });
});

describe("events", () => {
  it("current", () => {
    const r1 = getLocationStateFromUrl(
      "/",
      "list=events"
    ) as LocationStateUpcomingEvents;
    expect(r1.type).toBe("events");
    expect(r1.world).toBe(WATOPIA);
    expect(r1.query).toBe("");

    const r2 = getLocationStateFromUrl(
      "/",
      "list=events&q=query"
    ) as LocationStateUpcomingEvents;
    expect(r2.type).toBe("events");
    expect(r2.world).toBe(WATOPIA);
    expect(r2.query).toBe("query");

    const r3 = getLocationStateFromUrl(
      "/london",
      "list=events&q=query"
    ) as LocationStateUpcomingEvents;
    expect(r3.type).toBe("events");
    expect(r3.world).toBe(LONDON);
    expect(r3.query).toBe("query");
  });

  describe("legacy", () => {
    it("valid world", () => {
      const r1 = getLocationStateFromUrl(
        "/",
        "events="
      ) as LocationStateUpcomingEvents;
      expect(r1.type).toBe("events");
      expect(r1.world).toBe(WATOPIA);
      expect(r1.query).toBe("");

      const r2 = getLocationStateFromUrl(
        "/",
        "events=&q=query"
      ) as LocationStateUpcomingEvents;
      expect(r2.type).toBe("events");
      expect(r2.world).toBe(WATOPIA);
      expect(r2.query).toBe("query");

      const r3 = getLocationStateFromUrl(
        "/",
        "world=london&events=&q=query"
      ) as LocationStateUpcomingEvents;
      expect(r3.type).toBe("events");
      expect(r3.world).toBe(LONDON);
      expect(r3.query).toBe("query");
    });

    it("invalid world", () => {
      const r1 = getLocationStateFromUrl(
        "/",
        "world=test&events=&q=query"
      ) as LocationStateUpcomingEvents;
      expect(r1.type).toBe("events");
      expect(r1.world).toBe(WATOPIA);
      expect(r1.query).toBe("query");
    });
  });
});

describe("strava-activity", () => {
  it("current", () => {
    const r1 = getLocationStateFromUrl(
      "/strava-activities/42",
      ""
    ) as LocationStateStravaActivity;
    expect(r1.type).toBe("strava-activity");
    expect(r1.world).toBeNull();
    expect(r1.stravaActivityId).toBe("42");
    expect(r1.query).toBe("");

    const r2 = getLocationStateFromUrl(
      "/strava-activities/42",
      "q=query"
    ) as LocationStateStravaActivity;
    expect(r2.type).toBe("strava-activity");
    expect(r2.world).toBeNull();
    expect(r2.stravaActivityId).toBe("42");
    expect(r2.query).toBe("query");
  });

  it("legacy", () => {
    const r1 = getLocationStateFromUrl(
      "/",
      "strava-activity=42"
    ) as LocationStateStravaActivity;
    expect(r1.type).toBe("strava-activity");
    expect(r1.world).toBeNull();
    expect(r1.stravaActivityId).toBe("42");
    expect(r1.query).toBe("");

    const r2 = getLocationStateFromUrl(
      "/london",
      "strava-activity=42"
    ) as LocationStateStravaActivity;
    expect(r2.type).toBe("strava-activity");
    expect(r2.world).toBeNull();
    expect(r2.stravaActivityId).toBe("42");
    expect(r2.query).toBe("");

    const r3 = getLocationStateFromUrl(
      "/london",
      "strava-activity=42&q=query"
    ) as LocationStateStravaActivity;
    expect(r3.type).toBe("strava-activity");
    expect(r3.world).toBeNull();
    expect(r3.stravaActivityId).toBe("42");
    expect(r3.query).toBe("query");
  });
});

describe("strava-activities", () => {
  describe("current", () => {
    it("valid world", () => {
      const r1 = getLocationStateFromUrl(
        "/",
        "list=strava-activities"
      ) as LocationStateStravaActivities;
      expect(r1.type).toBe("strava-activities");
      expect(r1.world).toBe(WATOPIA);
      expect(r1.query).toBe("");

      const r2 = getLocationStateFromUrl(
        "/",
        "list=strava-activities&q=query"
      ) as LocationStateStravaActivities;
      expect(r2.type).toBe("strava-activities");
      expect(r2.world).toBe(WATOPIA);
      expect(r2.query).toBe("query");

      const r3 = getLocationStateFromUrl(
        "/london",
        "list=strava-activities&q=query"
      ) as LocationStateStravaActivities;
      expect(r3.type).toBe("strava-activities");
      expect(r3.world).toBe(LONDON);
      expect(r3.query).toBe("query");
    });

    it("invalid world", () => {
      const r1 = getLocationStateFromUrl(
        "/test",
        "list=strava-activities&q=query"
      ) as LocationStateStravaActivities;
      expect(r1.type).toBe("strava-activities");
      expect(r1.world).toBe(WATOPIA);
      expect(r1.query).toBe("query");
    });
  });

  describe("legacy", () => {
    it("valid world", () => {
      const r1 = getLocationStateFromUrl(
        "/",
        "strava-activities="
      ) as LocationStateStravaActivities;
      expect(r1.type).toBe("strava-activities");
      expect(r1.world).toBe(WATOPIA);
      expect(r1.query).toBe("");

      const r2 = getLocationStateFromUrl(
        "/",
        "strava-activities=&q=query"
      ) as LocationStateStravaActivities;
      expect(r2.type).toBe("strava-activities");
      expect(r2.world).toBe(WATOPIA);
      expect(r2.query).toBe("query");

      const r3 = getLocationStateFromUrl(
        "/",
        "world=london&strava-activities=&q=query"
      ) as LocationStateStravaActivities;
      expect(r3.type).toBe("strava-activities");
      expect(r3.world).toBe(LONDON);
      expect(r3.query).toBe("query");
    });

    it("invalid world", () => {
      const r1 = getLocationStateFromUrl(
        "/",
        "world=test&strava-activities=&q=query"
      ) as LocationStateStravaActivities;
      expect(r1.type).toBe("strava-activities");
      expect(r1.world).toBe(WATOPIA);
      expect(r1.query).toBe("query");
    });
  });
});
