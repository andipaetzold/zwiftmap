import { ListItemLink, ListItemText, SimpleListItem } from "@react-md/list";
import { OpenInNewFontIcon, TimerFontIcon } from "@react-md/material-icons";
import React from "react";
import { useAsync } from "react-async-hook";
import { Segment } from "zwift-data";
import {
  IsLoggedInStrava,
  useIsLoggedInStrava,
} from "../../../../hooks/useIsLoggedInStrava";
import { getStravaSegmentById } from "../../../../services/zwiftMapApi";
import { LoadingSpinner, LoadingSpinnerListItem } from "../../../Loading";
import { Time } from "../../../Time";

interface Props {
  segment: Segment;
}

export function SegmentStravaPB({ segment }: Props) {
  const isLoggedInStrava = useIsLoggedInStrava();

  const {
    result: stravaSegment,
    loading,
    error,
  } = useAsync(
    async (loggedIn: IsLoggedInStrava, segmentId?: number) => {
      if (loggedIn !== true || segmentId === undefined) {
        return null;
      }

      return await getStravaSegmentById(segmentId);
    },
    [isLoggedInStrava, segment.stravaSegmentId]
  );

  if (isLoggedInStrava === null) {
    return <LoadingSpinnerListItem />;
  }

  if (loading) {
    return (
      <SimpleListItem
        leftAddon={<TimerFontIcon />}
        leftAddonType="icon"
        rightAddon={<OpenInNewFontIcon />}
        rightAddonType="icon"
      >
        <LoadingSpinner small />
      </SimpleListItem>
    );
  }

  if (error || stravaSegment === null || stravaSegment === undefined) {
    return null;
  }

  return (
    <ListItemLink
      href={`https://www.strava.com/segments/${stravaSegment.id}`}
      target="_blank"
      leftAddon={<TimerFontIcon />}
      leftAddonType="icon"
      rightAddon={<OpenInNewFontIcon />}
      rightAddonType="icon"
    >
      <ListItemText>
        {stravaSegment.athlete_segment_stats.effort_count === 0 ? (
          <>No time set</>
        ) : (
          <Time
            seconds={stravaSegment.athlete_segment_stats.pr_elapsed_time!}
          />
        )}
      </ListItemText>
    </ListItemLink>
  );
}
