import { describe, expect, it } from "vitest";
import { routes, worlds } from "zwift-data";
import {
  LocationStateRoute,
  LocationStateShare,
  LocationStateStravaActivities,
  LocationStateStravaActivity,
  LocationStateUpcomingEvent,
  LocationStateUpcomingEvents,
} from ".";
import { getLocationStateFromUrl } from "./getLocationStateFromUrl";

const WATOPIA = worlds.find((w) => w.slug === "watopia");
const LONDON = worlds.find((w) => w.slug === "london");

const LONDON_CLASSIQUE = routes.find((r) => r.slug === "london-classique");

describe("default", () => {
  describe("current", () => {
    it("valid world", () => {
      const r1 = getLocationStateFromUrl("/", "");
      expect(r1.type).toBe("default");
      expect(r1.world).toBe(WATOPIA);

      const r2 = getLocationStateFromUrl("/london", "");
      expect(r2.type).toBe("default");
      expect(r2.world).toBe(LONDON);
    });

    it("invalid world", () => {
      const r = getLocationStateFromUrl("/test", "");
      expect(r.type).toBe("default");
      expect(r.world).toBe(WATOPIA);
    });
  });

  describe("legacy", () => {
    it("valid world", () => {
      const r = getLocationStateFromUrl("/", "world=london");
      expect(r.type).toBe("default");
      expect(r.world).toBe(LONDON);
    });

    it("invalid world", () => {
      const r = getLocationStateFromUrl("/", "world=test");
      expect(r.type).toBe("default");
      expect(r.world).toBe(WATOPIA);
    });
  });
});

describe("route", () => {
  describe("current", () => {
    it("correct world", () => {
      const r1 = getLocationStateFromUrl(
        "/london/london-classique",
        "",
      ) as LocationStateRoute;
      expect(r1.type).toBe("route");
      expect(r1.world).toBe(LONDON);
      expect(r1.route).toBe(LONDON_CLASSIQUE);
    });

    it("wrong world", () => {
      const r = getLocationStateFromUrl(
        "/watopia/london-classique",
        "",
      ) as LocationStateRoute;
      expect(r.type).toBe("route");
      expect(r.world).toBe(LONDON);
      expect(r.route).toBe(LONDON_CLASSIQUE);
    });

    it("invalid world", () => {
      const r = getLocationStateFromUrl(
        "/test/london-classique",
        "",
      ) as LocationStateRoute;
      expect(r.type).toBe("route");
      expect(r.world).toBe(LONDON);
      expect(r.route).toBe(LONDON_CLASSIQUE);
    });

    it("invalid route", () => {
      const r = getLocationStateFromUrl(
        "/london/test",
        "",
      ) as LocationStateRoute;
      expect(r.type).toBe("default");
      expect(r.world).toBe(LONDON);
    });

    it("invalid route & world", () => {
      const r = getLocationStateFromUrl("/test/test", "") as LocationStateRoute;
      expect(r.type).toBe("default");
      expect(r.world).toBe(WATOPIA);
    });
  });

  describe("legacy", () => {
    it("correct world", () => {
      const r1 = getLocationStateFromUrl(
        "/london",
        "route=london-classique",
      ) as LocationStateRoute;
      expect(r1.type).toBe("route");
      expect(r1.world).toBe(LONDON);
      expect(r1.route).toBe(LONDON_CLASSIQUE);

      const r2 = getLocationStateFromUrl(
        "/",
        "world=london&route=london-classique",
      ) as LocationStateRoute;
      expect(r2.type).toBe("route");
      expect(r2.world).toBe(LONDON);
      expect(r2.route).toBe(LONDON_CLASSIQUE);
    });

    it("wrong world", () => {
      const r = getLocationStateFromUrl(
        "/watopia",
        "route=london-classique",
      ) as LocationStateRoute;
      expect(r.type).toBe("route");
      expect(r.world).toBe(LONDON);
      expect(r.route).toBe(LONDON_CLASSIQUE);
    });

    it("invalid world", () => {
      const r = getLocationStateFromUrl(
        "/test",
        "route=london-classique",
      ) as LocationStateRoute;
      expect(r.type).toBe("route");
      expect(r.world).toBe(LONDON);
      expect(r.route).toBe(LONDON_CLASSIQUE);
    });

    it("invalid route", () => {
      const r = getLocationStateFromUrl("/london", "") as LocationStateRoute;
      expect(r.type).toBe("default");
      expect(r.world).toBe(LONDON);
    });

    it("invalid route & world", () => {
      const r = getLocationStateFromUrl(
        "/test",
        "route=test",
      ) as LocationStateRoute;
      expect(r.type).toBe("default");
      expect(r.world).toBe(WATOPIA);
    });
  });
});

describe("event", () => {
  it("current", () => {
    const r = getLocationStateFromUrl(
      "/events/42",
      "",
    ) as LocationStateUpcomingEvent;
    expect(r.type).toBe("event");
    expect(r.world).toBeNull();
    expect(r.eventId).toBe(42);
  });

  it("legacy", () => {
    const r1 = getLocationStateFromUrl(
      "/",
      "event=42",
    ) as LocationStateUpcomingEvent;
    expect(r1.type).toBe("event");
    expect(r1.world).toBeNull();
    expect(r1.eventId).toBe(42);

    const r2 = getLocationStateFromUrl(
      "/london",
      "event=42",
    ) as LocationStateUpcomingEvent;
    expect(r2.type).toBe("event");
    expect(r2.world).toBeNull();
    expect(r2.eventId).toBe(42);
  });
});

describe("events", () => {
  it("current", () => {
    const r1 = getLocationStateFromUrl(
      "/",
      "list=events",
    ) as LocationStateUpcomingEvents;
    expect(r1.type).toBe("events");
    expect(r1.world).toBe(WATOPIA);

    const r2 = getLocationStateFromUrl(
      "/london",
      "list=events",
    ) as LocationStateUpcomingEvents;
    expect(r2.type).toBe("events");
    expect(r2.world).toBe(LONDON);
  });

  describe("legacy", () => {
    it("valid world", () => {
      const r1 = getLocationStateFromUrl(
        "/",
        "events=",
      ) as LocationStateUpcomingEvents;
      expect(r1.type).toBe("events");
      expect(r1.world).toBe(WATOPIA);

      const r2 = getLocationStateFromUrl(
        "/",
        "world=london&events=",
      ) as LocationStateUpcomingEvents;
      expect(r2.type).toBe("events");
      expect(r2.world).toBe(LONDON);
    });

    it("invalid world", () => {
      const r = getLocationStateFromUrl(
        "/",
        "world=test&events=",
      ) as LocationStateUpcomingEvents;
      expect(r.type).toBe("events");
      expect(r.world).toBe(WATOPIA);
    });
  });
});

describe("strava-activity", () => {
  it("current", () => {
    const r = getLocationStateFromUrl(
      "/strava-activities/42",
      "",
    ) as LocationStateStravaActivity;
    expect(r.type).toBe("strava-activity");
    expect(r.world).toBeNull();
    expect(r.stravaActivityId).toBe(42);
  });

  it("legacy", () => {
    const r1 = getLocationStateFromUrl(
      "/",
      "strava-activity=42",
    ) as LocationStateStravaActivity;
    expect(r1.type).toBe("strava-activity");
    expect(r1.world).toBeNull();
    expect(r1.stravaActivityId).toBe(42);

    const r2 = getLocationStateFromUrl(
      "/london",
      "strava-activity=42",
    ) as LocationStateStravaActivity;
    expect(r2.type).toBe("strava-activity");
    expect(r2.world).toBeNull();
    expect(r2.stravaActivityId).toBe(42);
  });
});

describe("strava-activities", () => {
  describe("current", () => {
    it("valid world", () => {
      const r1 = getLocationStateFromUrl(
        "/",
        "list=strava-activities",
      ) as LocationStateStravaActivities;
      expect(r1.type).toBe("strava-activities");
      expect(r1.world).toBe(WATOPIA);

      const r2 = getLocationStateFromUrl(
        "/london",
        "list=strava-activities",
      ) as LocationStateStravaActivities;
      expect(r2.type).toBe("strava-activities");
      expect(r2.world).toBe(LONDON);
    });

    it("invalid world", () => {
      const r = getLocationStateFromUrl(
        "/test",
        "list=strava-activities",
      ) as LocationStateStravaActivities;
      expect(r.type).toBe("strava-activities");
      expect(r.world).toBe(WATOPIA);
    });
  });

  describe("legacy", () => {
    it("valid world", () => {
      const r1 = getLocationStateFromUrl(
        "/",
        "strava-activities=",
      ) as LocationStateStravaActivities;
      expect(r1.type).toBe("strava-activities");
      expect(r1.world).toBe(WATOPIA);

      const r2 = getLocationStateFromUrl(
        "/",
        "world=london&strava-activities=",
      ) as LocationStateStravaActivities;
      expect(r2.type).toBe("strava-activities");
      expect(r2.world).toBe(LONDON);
    });

    it("invalid world", () => {
      const r = getLocationStateFromUrl(
        "/",
        "world=test&strava-activities=",
      ) as LocationStateStravaActivities;
      expect(r.type).toBe("strava-activities");
      expect(r.world).toBe(WATOPIA);
    });
  });
});

it("strava-activity", () => {
  const r = getLocationStateFromUrl("/s/42", "") as LocationStateShare;
  expect(r.type).toBe("share");
  expect(r.world).toBeNull();
  expect(r.shareId).toBe("42");
});
