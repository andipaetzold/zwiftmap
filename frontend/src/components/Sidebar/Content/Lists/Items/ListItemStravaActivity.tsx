import { Avatar } from "@react-md/avatar";
import {
  ListItem,
  ListItemLink,
  ListItemText,
  SimpleListItem
} from "@react-md/list";
import { OpenInNewFontIcon } from "@react-md/material-icons";
import React from "react";
import { useAsync } from "react-async-hook";
import stravaLogo from "../../../../../assets/strava-40x40.png";
import { useIsLoggedInStrava } from "../../../../../hooks/useIsLoggedInStrava";
import {
  LocationStateStravaActivities,
  useLocationState
} from "../../../../../services/location-state";
import { useStravaAuthUrl } from "../../../../../services/strava/auth";
import { getStravaActivity } from "../../../../../services/StravaActivityRepository";
import { HoverData } from "../../../../../types";
import { Distance } from "../../../../Distance";
import { Elevation } from "../../../../Elevation";
import { LoadingSpinnerListItem } from "../../../../Loading";
import { Time } from "../../../../Time";

export interface Props {
  activity: { activityId: number; slug: string };
  onHoverRoute: (data: HoverData) => void;
}

export function ListItemStravaActivity({ activity, onHoverRoute }: Props) {
  const isLoggedInStrava = useIsLoggedInStrava();
  const stravaAuthUrl = useStravaAuthUrl();

  if (!isLoggedInStrava) {
    return (
      <ListItemLink
        leftAddon={
          <Avatar color="#ff6b00">
            <img src={stravaLogo} alt="" />
          </Avatar>
        }
        leftAddonType="avatar"
        rightAddon={<OpenInNewFontIcon />}
        rightAddonType="icon"
        href={stravaAuthUrl}
      >
        <ListItemText secondaryText="…to view Strava activity">
          Authorize Strava App…
        </ListItemText>
      </ListItemLink>
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
  const [, setLocationState] =
    useLocationState<LocationStateStravaActivities>();

  if (loading) {
    return <LoadingSpinnerListItem />;
  }

  if (!activity) {
    return (
      <SimpleListItem
        secondaryText="Make sure you can access the activity and it was recorded in Zwift."
        threeLines
      >
        An error occurred
      </SimpleListItem>
    );
  }

  const handleClick = () => {
    setLocationState({
      world: activity.world,
      stravaActivityId: activity.id,
      query: "",
      type: "strava-activity",
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
