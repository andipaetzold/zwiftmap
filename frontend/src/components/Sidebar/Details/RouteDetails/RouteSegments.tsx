import { ListItem, SimpleListItem } from "@react-md/list";
import {
  VisibilityFontIcon,
  VisibilityOffFontIcon,
} from "@react-md/material-icons";
import { Text } from "@react-md/typography";
import React from "react";
import { segments } from "../../../../data";
import { useLocationState } from "../../../../hooks/useLocationState";
import { Route, Segment, SegmentType } from "../../../../types";
import { Distance } from "../../../Distance";

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
          key={segment.slug}
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
  return (
    <>
      {segmentTypes[segment.type]}
      <br />
      <Distance distance={segment.distance} />
      {segment.avgIncline && (
        <>
          {" "}
          |{" "}
          {new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
            style: "percent",
          }).format(segment.avgIncline / 100)}
        </>
      )}
    </>
  );
}

const segmentTypes: { [type in SegmentType]: string } = {
  climb: "Climb",
  sprint: "Sprint",
  segment: "Segment",
};
