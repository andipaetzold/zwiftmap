import { isAfter, parseISO, subDays } from "date-fns";
import { ZwiftEvent } from "../types";

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
  const startDate = parseISO(event.eventStart);
  if (isAfter(startDate, subDays(new Date(), 1))) {
    return FORMAT_SHORT.format(startDate);
  } else {
    return FORMAT_LONG.format(startDate);
  }
}

export function formatEventSubgroupStart(start: string): string {
  const startDate = parseISO(start);
  if (isAfter(startDate, subDays(new Date(), 1))) {
    return FORMAT_SHORT.format(startDate);
  } else {
    return FORMAT_LONG.format(startDate);
  }
}
