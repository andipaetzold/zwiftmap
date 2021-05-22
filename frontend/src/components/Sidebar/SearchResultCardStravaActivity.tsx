import { Avatar } from "@react-md/avatar";
import { ListItem } from "@react-md/list";
import { OpenInNewFontIcon } from "@react-md/material-icons";
import { CircularProgress } from "@react-md/progress";
import React from "react";
import { useAsync } from "react-async-hook";
import stravaLogo from "../../assets/strava-40x40.png";
import { useStravaToken } from "../../hooks/useStravaToken";
import { getStravaAuthUrl } from "../../services/strava";
import { getStravaActivity } from "../../services/StravaActivityRepository";
import { Distance } from "../Distance";
import { Elevation } from "../Elevation";
import { Time } from "../Time";

export interface Props {
  activity: { activityId: string; slug: string };
  onClick: () => void;
  onHoverRoute: (route?: string) => void;
}

export function SearchResultCardStravaActivity({
  activity,
  onClick,
  onHoverRoute,
}: Props) {
  const [stravaToken] = useStravaToken();

  if (stravaToken === null) {
    return (
      <ListItem
        leftAddon={
          <Avatar color="#ff6b00">
            <img src={stravaLogo} alt="" />
          </Avatar>
        }
        leftAddonType="avatar"
        rightAddon={<OpenInNewFontIcon />}
        rightAddonType="icon"
        secondaryText="…to view Strava activity"
        onClick={() =>
          (window.location.href = getStravaAuthUrl(
            `activity:${activity.activityId}`
          ))
        }
      >
        Authorize Strava App…
      </ListItem>
    );
  }

  return (
    <SearchResultCardStravaActivityWithToken
      activity={activity}
      onClick={onClick}
      onHoverRoute={onHoverRoute}
      token={stravaToken}
    />
  );
}

function SearchResultCardStravaActivityWithToken({
  activity: { activityId },
  onClick,
  onHoverRoute,
  token,
}: Props & { token: string }) {
  const { result: activity, loading } = useAsync(getStravaActivity, [
    token,
    activityId,
  ]);

  if (!activity) {
    if (loading) {
      return (
        <CircularProgress
          id={`strava-activity-${activityId}`}
          circleStyle={{ stroke: "black" }}
        />
      );
    } else {
      return null;
    }
  }

  return (
    <ListItem
      onClick={onClick}
      secondaryText={
        <>
          <Distance distance={activity.distance / 1_000} /> |{" "}
          <Elevation elevation={activity.elevation} />
          <br />
          {activity.avgWatts && <>{Math.round(activity.avgWatts)}W | </>}
          <Time seconds={activity.time} />
        </>
      }
      threeLines
      rightAddonType={activity.photoUrl ? "large-media" : undefined}
      rightAddon={
        activity.photoUrl ? (
          <img src={activity.photoUrl} alt="" width="100" />
        ) : undefined
      }
    >
      {activity.name}
    </ListItem>
  );
}
