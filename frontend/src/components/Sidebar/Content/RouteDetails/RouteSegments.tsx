import { List, ListSubheader, SimpleListItem } from "@react-md/list";
import { Typography } from "@react-md/typography";
import React from "react";
import { useAsync } from "react-async-hook";
import { Route, Segment, segments, SegmentType } from "zwift-data";
import { FORMAT_INCLINE } from "../../../../constants";
import {
  IsLoggedInStrava,
  useIsLoggedInStrava,
} from "../../../../hooks/useIsLoggedInStrava";
import { getStravaSegmentById } from "../../../../services/zwiftMapApi";
import { Distance } from "../../../Distance";
import { Time } from "../../../Time";

interface Props {
  route: Route;
}

export function RouteSegments({ route }: Props) {
  const segmentsOnRoute = segments
    .filter((s) => s.world === route.world)
    .filter((s) => route.segments.includes(s.slug))
    .sort((a, b) => a.name.localeCompare(b.name));

  if (segmentsOnRoute.length === 0) {
    return (
      <List
        role="list"
        aria-labelledby="route-segments-header"
        style={{ marginTop: 0, marginBottom: 0 }}
      >
        <ListSubheader role="presentation" id="route-segments-header">
          Segments
        </ListSubheader>
        <SimpleListItem>
          <Typography type="body-2">No segments on this route.</Typography>
        </SimpleListItem>
      </List>
    );
  }

  return (
    <List
      role="list"
      aria-labelledby="route-segments-header"
      style={{ marginTop: 0, marginBottom: 0 }}
    >
      <ListSubheader role="presentation" id="route-segments-header">
        Segments
      </ListSubheader>
      {segmentsOnRoute.map((segment) => (
        <SimpleListItem
          key={segment.slug}
          rightAddonType="icon"
          primaryText={segment.name}
          secondaryText={<SecondaryText segment={segment} />}
          threeLines
        />
      ))}
    </List>
  );
}

interface SecondaryTextProps {
  segment: Segment;
}

function SecondaryText({ segment }: SecondaryTextProps) {
  const isLoggedIn = useIsLoggedInStrava();
  const { result: stravaSegment } = useAsync(
    async (sid: number | undefined, loggedIn: IsLoggedInStrava) => {
      if (sid === undefined || loggedIn !== true) {
        return null;
      }
      return await getStravaSegmentById(sid);
    },
    [segment.stravaSegmentId, isLoggedIn]
  );
  const segmentPB =
    (stravaSegment?.athlete_segment_stats.effort_count ?? 0) > 0
      ? stravaSegment?.athlete_segment_stats.pr_elapsed_time
      : null;

  return (
    <>
      <Distance distance={segment.distance} />
      {segment.avgIncline && (
        <> | {FORMAT_INCLINE.format(segment.avgIncline / 100)}</>
      )}
      <br />
      {segmentPB ? (
        <>
          PB: <Time seconds={segmentPB} />
        </>
      ) : (
        segmentTypes[segment.type]
      )}
    </>
  );
}

const segmentTypes: { [type in SegmentType]: string } = {
  climb: "Climb",
  sprint: "Sprint",
  segment: "Segment",
};
