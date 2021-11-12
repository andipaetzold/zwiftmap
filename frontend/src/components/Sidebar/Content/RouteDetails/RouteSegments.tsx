import { ListItem, ListSubheader, SimpleListItem } from "@react-md/list";
import {
  VisibilityFontIcon,
  VisibilityOffFontIcon,
} from "@react-md/material-icons";
import { Text } from "@react-md/typography";
import React from "react";
import { useAsync } from "react-async-hook";
import { Route, Segment, segments, SegmentType } from "zwift-data";
import { FORMAT_INCLINE } from "../../../../constants";
import {
  IsLoggedInStrava,
  useIsLoggedInStrava,
} from "../../../../hooks/useIsLoggedInStrava";
import {
  LocationStateRoute,
  useLocationState,
} from "../../../../services/location-state";
import { fetchSegment } from "../../../../services/strava/api";
import { Distance } from "../../../Distance";
import { Time } from "../../../Time";

interface Props {
  route: Route;
}

export function RouteSegments({ route }: Props) {
  const [locationState, setLocationState] =
    useLocationState<LocationStateRoute>();
  const segmentsOnRoute = segments
    .filter((s) => s.world === route.world)
    .filter((s) => route.segments.includes(s.slug))
    .sort((a, b) => a.name.localeCompare(b.name));

  if (segmentsOnRoute.length === 0) {
    return (
      <SimpleListItem>
        <Text type="body-2">No segments on this route.</Text>
      </SimpleListItem>
    );
  }

  const selectedSegments = (locationState as LocationStateRoute).segments;

  return (
    <>
      <ListSubheader>Segments</ListSubheader>
      {segmentsOnRoute.map((segment) => (
        <ListItem
          key={segment.slug}
          disabled={segment.stravaSegmentId === undefined}
          rightAddonType="icon"
          rightAddon={
            segment.stravaSegmentId ===
            undefined ? null : selectedSegments.includes(segment) ? (
              <VisibilityFontIcon />
            ) : (
              <VisibilityOffFontIcon />
            )
          }
          secondaryText={<SecondaryText segment={segment} />}
          threeLines
          onClick={() => {
            if (segment.stravaSegmentId === undefined) {
              return;
            }

            if (selectedSegments.includes(segment)) {
              setLocationState({
                ...locationState,
                type: "route",
                route: (locationState as LocationStateRoute).route,
                segments: selectedSegments.filter((s) => s !== segment),
              });
            } else {
              setLocationState({
                ...locationState,
                type: "route",
                route: (locationState as LocationStateRoute).route,
                segments: [...selectedSegments, segment],
              });
            }
          }}
        >
          {segment.name}
        </ListItem>
      ))}
    </>
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
      return await fetchSegment(sid.toString());
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
