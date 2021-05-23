import { Avatar } from "@react-md/avatar";
import { ListItem, SimpleListItem } from "@react-md/list";
import { OpenInNewFontIcon } from "@react-md/material-icons";
import { CircularProgress } from "@react-md/progress";
import React from "react";
import { useAsync } from "react-async-hook";
import stravaLogo from "../../assets/strava-40x40.png";
import { useLocationState } from "../../hooks/useLocationState";
import { useStravaToken } from "../../hooks/useStravaToken";
import { getStravaAuthUrl } from "../../services/strava";
import { getStravaActivity } from "../../services/StravaActivityRepository";
import { Distance } from "../Distance";
import { Elevation } from "../Elevation";
import { Time } from "../Time";

export interface Props {
  activity: { activityId: string; slug: string };
  onHoverRoute: (route?: string) => void;
}

export function SearchResultCardStravaActivity({
  activity,
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
          (window.location.href = getStravaAuthUrl({
            "strava-activity": activity.activityId,
          }))
        }
      >
        Authorize Strava App…
      </ListItem>
    );
  }

  return (
    <SearchResultCardStravaActivityWithToken
      activity={activity}
      onHoverRoute={onHoverRoute}
      token={stravaToken}
    />
  );
}

function SearchResultCardStravaActivityWithToken({
  activity: { activityId },
  onHoverRoute,
  token,
}: Props & { token: string }) {
  const { result: activity, loading } = useAsync(getStravaActivity, [
    token,
    activityId,
  ]);
  const [, setLocationState] = useLocationState();

  if (!activity) {
    if (loading) {
      return (
        <CircularProgress
          id={`strava-activity-${activityId}`}
          circleStyle={{ stroke: "black" }}
        />
      );
    } else {
      return (
        <SimpleListItem
          secondaryText="Make sure you can access the activity and it was recorded in Zwift."
          threeLines
        >
          An error occurred
        </SimpleListItem>
      );
    }
  }

  const handleClick = () => {
    setLocationState({
      world: activity.world,
      stravaActivityId: activity.id,
      segments: [],
    });
  };

  return (
    <ListItem
      onClick={handleClick}
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
