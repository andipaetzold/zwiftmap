import axios from "axios";
import { Request, Response } from "express";
import { fetchEvent } from "../../../shared/events/api";
import { X2jOptionsOptional, XMLParser } from "fast-xml-parser";
import { create } from "xmlbuilder2";
import { getColorForPower } from "./workout/util";
import {
  BarInterval,
  FreeRideInterval,
  Interval,
  RampInterval,
} from "./workout/types";
import { COLORS, ZONES } from "./workout/constants";
import { FIFTEEN_MINUTES } from "../../../constants";

const HEIGHT = 250;
const WIDTH = 1_000;

const parserOptions: X2jOptionsOptional = {
  preserveOrder: true,
  ignoreAttributes: false,
  attributeNamePrefix: "",
  parseAttributeValue: true,
};
const parser = new XMLParser(parserOptions);

export async function handleGetEventWorkout(req: Request, res: Response) {
  const eventId = req.params.eventId;

  const event = await fetchEvent(eventId);

  if (!event) {
    res.sendStatus(404);
    return;
  }

  if (event.type !== "EVENT_TYPE_GROUP_WORKOUT") {
    res.sendStatus(404);
    return;
  }

  const workoutUrl =
    event.customUrl !== ""
      ? event.customUrl
      : event.eventSubgroups[0].customUrl;

  if (!workoutUrl) {
    res.sendStatus(404);
    return;
  }

  const response = await axios.get(workoutUrl);
  const xmlData = response.data;

  const workout = parser.parse(xmlData);
  const image = createImage(workout);

  res
    .header("Cache-control", `private, max-age=${FIFTEEN_MINUTES}`)
    .status(200)
    .contentType("svg")
    .send(image);
}

function createImage(parsedXML: any) {
  const workout: any[] = parsedXML
    .find((node: any) => "workout_file" in node)!
    .workout_file.find((node: any) => "workout" in node).workout;

  const intervals: Interval[] = workout
    .flatMap((node): Interval[] => {
      if ("Warmup" in node) {
        return [
          {
            type: "ramp",
            duration: node[":@"].Duration,
            from: node[":@"].PowerLow,
            to: node[":@"].PowerHigh,
          },
        ];
      } else if ("Cooldown" in node) {
        return [
          {
            type: "ramp",
            duration: node[":@"].Duration,
            from: node[":@"].PowerLow,
            to: node[":@"].PowerHigh,
          },
        ];
      } else if ("SteadyState" in node) {
        return [
          {
            type: "bar",
            duration: node[":@"].Duration,
            power: node[":@"].Power,
          },
        ];
      } else if ("FreeRide" in node) {
        return [
          {
            type: "free-ride",
            duration: node[":@"].Duration,
          },
        ];
      } else if ("IntervalsT" in node) {
        const result: Interval[] = [];
        for (let i = 0; i < node[":@"].Repeat; ++i) {
          result.push({
            type: "bar",
            duration: node[":@"].OnDuration,
            power: node[":@"].OnPower,
          });
          result.push({
            type: "bar",
            duration: node[":@"].OffDuration,
            power: node[":@"].OffPower,
          });
        }
        return result;
      } else {
        return [];
      }
    })
    .reduce<Interval[]>((prev, cur) => {
      // dedupe intervals where only cadence changes
      const prevInterval = prev.at(-1);
      if (
        prevInterval &&
        cur.type === "bar" &&
        prevInterval.type === "bar" &&
        prevInterval.power === cur.power
      ) {
        return [
          ...prev.slice(0, -1),
          { ...prevInterval, duration: prevInterval.duration + cur.duration },
        ];
      } else {
        return [...prev, cur];
      }
    }, []);

  const totalDuration = intervals
    .map((i) => i.duration)
    .reduce((prev, cur) => prev + cur, 0);
  const maxPower = Math.max(
    ...intervals.flatMap((interval) => {
      switch (interval.type) {
        case "free-ride":
          return [0.3];
        case "ramp":
          return [interval.from, interval.to];
        case "bar":
          return [interval.power];
      }
    })
  );

  const intervalsWithRelativeValues: Interval[] = intervals.map(
    (interval): Interval => {
      const duration = interval.duration / totalDuration;

      switch (interval.type) {
        case "free-ride":
          return { type: "free-ride", duration };
        case "ramp":
          return {
            type: "ramp",
            duration,
            from: interval.from / maxPower,
            to: interval.to / maxPower,
          };
        case "bar":
          return { type: "bar", duration, power: interval.power / maxPower };
      }
    }
  );

  const svgNodes: any[] = [];
  let currentTime = 0;
  for (const interval of intervalsWithRelativeValues) {
    switch (interval.type) {
      case "ramp":
        svgNodes.push(...createRamp(currentTime, interval));
        break;
      case "bar":
        svgNodes.push(...createBar(currentTime, interval));
        break;
      case "free-ride":
        svgNodes.push(...createFreeRide(currentTime, interval));
    }

    currentTime += interval.duration;
  }

  const doc = create({
    svg: {
      "@version": "1.1",
      "@xmlns": "http://www.w3.org/2000/svg",
      "@height": "100%",
      "@width": "100%",
      "@viewBox": `0 0 ${WIDTH} ${HEIGHT}`,
      g: svgNodes,
    },
  });

  return doc.end({ prettyPrint: true });
}

function createRamp(start: number, interval: RampInterval): any[] {
  const lowPower = Math.min(interval.from, interval.to);
  const highPower = Math.max(interval.from, interval.to);
  const powerAmplitude = highPower - lowPower;

  const zonesInInterval = [...ZONES]
    .sort((a, b) => a.min - b.min)
    .filter((zone) => zone.min < highPower && zone.max > lowPower);
  const isSingleZone = zonesInInterval.length === 1;

  if (!isSingleZone) {
    return zonesInInterval.map((zone, i) => {
      const from = i === 0 ? interval.from : zone.min;
      const to = i === zonesInInterval.length - 1 ? interval.to : zone.max;

      const duration =
        (interval.duration / powerAmplitude) * Math.abs(from - to);

      const newStart =
        start +
        (interval.duration / powerAmplitude) * Math.abs(interval.from - from);

      return createRamp(newStart, {
        type: "ramp",
        duration,
        from,
        to,
      });
    });
  }

  const zone = zonesInInterval[0];
  return [
    {
      path: {
        "@d": [
          `M ${start * WIDTH},${HEIGHT}`,
          `L ${start * WIDTH},${(1 - interval.from) * HEIGHT}`,
          `L ${(start + interval.duration) * WIDTH},${
            (1 - interval.to) * HEIGHT
          }`,
          `L ${(start + interval.duration) * WIDTH},${HEIGHT}`,
        ].join("\n"),
        "@stroke-width": 0,
        "@fill": zone.color,
      },
    },
  ];
}

function createBar(start: number, interval: BarInterval) {
  return [
    {
      rect: {
        "@x": start * WIDTH,
        "@y": (1 - interval.power) * HEIGHT,
        "@height": interval.power * HEIGHT,
        "@width": interval.duration * WIDTH,
        "@stroke-width": 0,
        "@fill": getColorForPower(interval.power),
      },
    },
  ];
}

function createFreeRide(start: number, interval: FreeRideInterval) {
  return [
    {
      rect: {
        "@x": start * WIDTH,
        "@y": (1 - 0.3) * HEIGHT,
        "@height": 0.3 * HEIGHT,
        "@width": interval.duration * WIDTH,
        "@stroke-width": 0,
        "@fill": COLORS.LIGHT_GRAY,
      },
    },
  ];
}
