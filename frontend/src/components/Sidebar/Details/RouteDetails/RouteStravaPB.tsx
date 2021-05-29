import { ListItem, SimpleListItem } from "@react-md/list";
import { OpenInNewFontIcon, TimerFontIcon } from "@react-md/material-icons";
import { CircularProgress } from "@react-md/progress";
import React from "react";
import { useAsync } from "react-async-hook";
import { useIsLoggedInStrava } from "../../../../hooks/useIsLoggedInStrava";
import { fetchSegment } from "../../../../services/strava/api";
import { Route } from "../../../../types";
import { Time } from "../../../Time";

interface Props {
  route: Route;
}

export function RouteStravaPB({ route }: Props) {
  const isLoggedInStrava = useIsLoggedInStrava();

  const {
    result: segment,
    loading,
    error,
  } = useAsync(
    async (loggedIn: boolean, segmentId?: number) => {
      if (!loggedIn || segmentId === undefined) {
        return null;
      }

      return await fetchSegment(segmentId.toString());
    },
    [isLoggedInStrava, route.stravaSegmentId]
  );

  if (loading) {
    return (
      <SimpleListItem
        leftAddon={<TimerFontIcon />}
        leftAddonType="icon"
        rightAddon={<OpenInNewFontIcon />}
        rightAddonType="icon"
      >
        <CircularProgress
          id={`strava-route-pb-${route.id}`}
          circleStyle={{ stroke: "black" }}
          small
        />
      </SimpleListItem>
    );
  }

  if (error || segment === null || segment === undefined) {
    return null;
  }

  const handleClick = () => {
    window.open(`https://www.strava.com/segments/${segment.id}`, "_blank");
  };

  return (
    <ListItem
      leftAddon={<TimerFontIcon />}
      leftAddonType="icon"
      rightAddon={<OpenInNewFontIcon />}
      rightAddonType="icon"
      onClick={handleClick}
    >
      {segment.athlete_segment_stats.effort_count === 0 ? (
        <>No time set</>
      ) : (
        <Time seconds={segment.athlete_segment_stats.pr_elapsed_time!} />
      )}
    </ListItem>
  );
}
