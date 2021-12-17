import * as Sentry from "@sentry/react";
import { isAfter } from "date-fns";
import parseISO from "date-fns/parseISO";
import subDays from "date-fns/subDays";
import { ZwiftEvent } from "../services/events";

export const FORMAT_SHORT = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  weekday: "short",
});

export const FORMAT_LONG = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});

export function formatEventStart(event: ZwiftEvent): string {
  try {
    if (!event.eventStart) {
      Sentry.captureException("Unknown start time", {
        extra: {
          eventId: event.id,
          eventStart: event.eventStart,
        },
      });
      return "Unknown start time";
    }

    const startDate = parseISO(event.eventStart);
    if (isAfter(startDate, subDays(new Date(), 1))) {
      return FORMAT_SHORT.format(startDate);
    } else {
      return FORMAT_LONG.format(startDate);
    }
  } catch (e) {
    // TODO: remove once bug was identified
    Sentry.captureException(e, {
      extra: {
        eventId: event.id,
        eventStart: event.eventStart,
      },
    });
    return "Unknown start time";
  }
}
