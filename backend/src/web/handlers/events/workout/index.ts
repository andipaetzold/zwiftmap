import axios from "axios";
import { Request, Response } from "express";
import { X2jOptions, XMLParser } from "fast-xml-parser";
import { Record, String } from "runtypes";
import { create } from "xmlbuilder2";
import { getEvent } from "../../../../shared/events/index.js";
import { NumberString } from "../../../../shared/runtypes.js";
import { COLORS, ZONES } from "./constants.js";
import {
  BarInterval,
  FreeRideInterval,
  Interval,
  RampInterval,
} from "./types.js";
import { getColorForPower, getPowerForZone } from "./util.js";

const HEIGHT = 250;
const WIDTH = 1_000;

const parserOptions: X2jOptions = {
  preserveOrder: true,
  ignoreAttributes: false,
  attributeNamePrefix: "",
  parseAttributeValue: true,
};
const parser = new XMLParser(parserOptions);

const paramsRunType = Record({
  eventId: NumberString,
  subGroupId: String.optional(),
});

export async function handleGetEventWorkout(req: Request, res: Response) {
  if (!paramsRunType.guard(req.params)) {
    res.sendStatus(400);
    return;
  }

  const { result: event, ttl } = await getEvent(+req.params.eventId);

  if (!event) {
    res.sendStatus(404);
    return;
  }

  if (event.type !== "EVENT_TYPE_GROUP_WORKOUT") {
    res.sendStatus(404);
    return;
  }

  const workoutUrl =
    event.eventSubgroups.find((g) => g.subgroupLabel === req.params.subgroupId)
      ?.customUrl ??
    event.eventSubgroups[0]?.customUrl ??
    event.customUrl;

  if (!workoutUrl) {
    res.sendStatus(404);
    return;
  }

  const response = await axios.get(workoutUrl);
  const xmlData = response.data;

  const workout = parser.parse(xmlData);
  const image = createImage(workout);

  if (!image) {
    res.sendStatus(404);
    return;
  }

  res
    .status(200)
    .contentType("svg")
    .header("Cache-Control", `public, max-age=${ttl}`)
    .send(image);
}

function createImage(parsedXML: any) {
  const workout: any[] = parsedXML
    .find((node: any) => "workout_file" in node)
    ?.workout_file.find((node: any) => "workout" in node)?.workout;
  if (!workout) {
    return;
  }

  const intervals: Interval[] = workout
    .flatMap((node): Interval[] => {
      if (node[":@"].Zone) {
        return [
          {
            type: "bar",
            duration: node[":@"].Duration,
            power: getPowerForZone(node[":@"].Zone),
          },
        ];
      }

      if (node[":@"].Power) {
        return [
          {
            type: "bar",
            duration: node[":@"].Duration,
            power: node[":@"].Power,
          },
        ];
      }

      if (node[":@"].PowerLow && node[":@"].PowerHigh) {
        return [
          {
            type: "ramp",
            duration: node[":@"].Duration,
            from: node[":@"].PowerLow,
            to: node[":@"].PowerHigh,
          },
        ];
      }

      if ("IntervalsT" in node) {
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
      }

      if ("FreeRide" in node) {
        return [
          {
            type: "free-ride",
            duration: node[":@"].Duration,
          },
        ];
      }

      return [];
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

  const intervalsWithRelativeDuration: Interval[] = intervals.map(
    (interval) => ({ ...interval, duration: interval.duration / totalDuration })
  );

  const svgNodes: any[] = [];
  let currentTime = 0;
  for (const interval of intervalsWithRelativeDuration) {
    switch (interval.type) {
      case "ramp":
        svgNodes.push(...createRamp(currentTime, interval, maxPower));
        break;
      case "bar":
        svgNodes.push(...createBar(currentTime, interval, maxPower));
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

function createRamp(
  start: number,
  interval: RampInterval,
  maxPower: number
): any[] {
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

      return createRamp(
        newStart,
        {
          type: "ramp",
          duration,
          from,
          to,
        },
        maxPower
      );
    });
  }

  const zone = zonesInInterval[0];

  const relativePowerFrom = interval.from / maxPower;
  const relativePowerTo = interval.to / maxPower;

  return [
    {
      path: {
        "@d": [
          `M ${start * WIDTH},${HEIGHT}`,
          `L ${start * WIDTH},${(1 - relativePowerFrom) * HEIGHT}`,
          `L ${(start + interval.duration) * WIDTH},${
            (1 - relativePowerTo) * HEIGHT
          }`,
          `L ${(start + interval.duration) * WIDTH},${HEIGHT}`,
        ].join("\n"),
        "@stroke-width": 0,
        "@fill": zone.color,
      },
    },
  ];
}

function createBar(start: number, interval: BarInterval, maxPower: number) {
  const relativePower = interval.power / maxPower;

  return [
    {
      rect: {
        "@x": start * WIDTH,
        "@y": (1 - relativePower) * HEIGHT,
        "@height": relativePower * HEIGHT,
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
