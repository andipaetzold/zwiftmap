import { ListItem, SimpleListItem } from "@react-md/list";
import React from "react";
import { segments } from "../../../../data";
import { Route, Segment, SegmentType } from "../../../../types";
import { Text } from "@react-md/typography";
import round from "lodash/round";
import { useLocationState } from "../../../../hooks/useLocationState";
import {
  VisibilityFontIcon,
  VisibilityOffFontIcon,
} from "@react-md/material-icons";

interface Props {
  route: Route;
}

export function RouteSegments({ route }: Props) {
  const [locationState, setLocationState] = useLocationState();
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

  return (
    <>
      {segmentsOnRoute.map((segment) => (
        <ListItem
          disabled={segment.stravaSegmentId === undefined}
          rightAddonType="icon"
          rightAddon={
            segment.stravaSegmentId ===
            undefined ? null : locationState.segments.includes(segment) ? (
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

            if (locationState.segments.includes(segment)) {
              setLocationState({
                ...locationState,
                segments: locationState.segments.filter((s) => s !== segment),
              });
            } else {
              setLocationState({
                ...locationState,
                segments: [...locationState.segments, segment],
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
  const details = [];
  if (segment.distance) {
    if (segment.distance < 1) {
      details.push(`${round(segment.distance * 1_000)}m`);
    } else {
      details.push(`${round(segment.distance, 1)}km`);
    }
  }

  if (segment.avgIncline) {
    details.push(`${round(segment.avgIncline, 1)}%`);
  }

  return (
    <>
      {segmentTypes[segment.type]}
      <br />
      {details.join(" | ")}
    </>
  );
}

const segmentTypes: { [type in SegmentType]: string } = {
  climb: "Climb",
  sprint: "Sprint",
  segment: "Segment",
};
