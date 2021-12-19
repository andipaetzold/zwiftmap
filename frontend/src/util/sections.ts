interface Section<T, Interval> {
  stream: T[];
  start: number;
  end: number;
  interval: Interval | undefined;
}

/**
 * Assumes:
 * - intervals are not overlapping
 */
export function getSectionsFromIntervals<T, Interval>(
  stream: T[],
  intervals: Interval[],
  getRangeFromInterval: (i: Interval) => [number, number]
): Section<T, Interval>[] {
  if (intervals.length === 0) {
    return [{ stream, start: 0, end: stream.length - 1, interval: undefined }];
  }

  const sortedIntervals = [...intervals].sort(
    (a, b) => getRangeFromInterval(a)[0] - getRangeFromInterval(b)[0]
  );

  // sections not covered by intervals
  const nonIntervalSections: Section<T, Interval>[] = sortedIntervals
    .map((interval, intervalIndex): Section<T, Interval> | undefined => {
      const [start] = getRangeFromInterval(interval);

      if (start === 0) {
          return undefined;
      }

      if (intervalIndex === 0) {
        return {
          stream: stream.slice(0, start + 1),
          start: 0,
          end: start,
          interval: undefined,
        };
      }

      const prevInterval = sortedIntervals[intervalIndex - 1];
      const [, prevEnd] = getRangeFromInterval(prevInterval);
      if (start <= prevEnd) {
        return undefined;
      }

      return {
        stream: stream.slice(prevEnd, start + 1),
        start: prevEnd,
        end: start,
        interval: undefined,
      };
    })
    .filter(
      (section): section is Section<T, Interval> => section !== undefined
    );

  // last section
  {
    const [, lastIntervalEnd] = getRangeFromInterval(
      sortedIntervals[sortedIntervals.length - 1]
    );

    if (lastIntervalEnd < stream.length - 1) {
      nonIntervalSections.push({
        stream: stream.slice(lastIntervalEnd),
        start: lastIntervalEnd,
        end: stream.length - 1,
        interval: undefined,
      });
    }
  }

  // sections coverd by intervals
  const intervalSections: Section<T, Interval>[] = sortedIntervals.map(
    (interval) => {
      const [start, end] = getRangeFromInterval(interval);

      return {
        stream: stream.slice(start, end + 1),
        start,
        end: end,
        interval,
      };
    }
  );

  return [...nonIntervalSections, ...intervalSections].sort(
    (a, b) => a.start - b.start
  );
}
