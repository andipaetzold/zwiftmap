import { Avatar } from "@react-md/avatar";
import { ListItem, SimpleListItem } from "@react-md/list";
import { OpenInNewFontIcon } from "@react-md/material-icons";
import { CircularProgress } from "@react-md/progress";
import React from "react";
import { useAsync } from "react-async-hook";
import stravaLogo from "../../assets/strava-40x40.png";
import { useIsLoggedInStrava } from "../../hooks/useIsLoggedInStrava";
import { useLocationState } from "../../hooks/useLocationState";
import { openStravaAuthUrl } from "../../services/strava/auth";
import { getStravaActivity } from "../../services/StravaActivityRepository";
import { Distance } from "../Distance";
import { Elevation } from "../Elevation";
import { Time } from "../Time";

export interface Props {
  activity: { activityId: string; slug: string };
  onHoverRoute: (route?: string) => void;
}

export function ListItemStravaActivity({
  activity,
  onHoverRoute,
}: Props) {
  const isLoggedInStrava = useIsLoggedInStrava();

  if (!isLoggedInStrava) {
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
        onClick={openStravaAuthUrl}
      >
        Authorize Strava App…
      </ListItem>
    );
  }

  return (
    <SearchResultCardStravaActivityWithToken
      activity={activity}
      onHoverRoute={onHoverRoute}
    />
  );
}

function SearchResultCardStravaActivityWithToken({
  activity: { activityId },
  onHoverRoute,
}: Props) {
  const { result: activity, loading } = useAsync(getStravaActivity, [
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
      query: "",
    });
  };

  return (
    <ListItem
      onClick={handleClick}
      secondaryText={
        <>
          <Distance distance={activity.distance} /> |{" "}
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
