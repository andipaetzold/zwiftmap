import { ListItem, SimpleListItem } from "@react-md/list";
import React from "react";
import { useAsync } from "react-async-hook";
import { useIsLoggedInStrava } from "../../../../../hooks/useIsLoggedInStrava";
import { useStore } from "../../../../../hooks/useStore";
import {
  LocationStateStravaActivities,
  useLocationState,
} from "../../../../../services/location-state";
import { getStravaActivity } from "../../../../../services/StravaActivityRepository";
import { HoverData } from "../../../../../types";
import { ConnectToStravaListItem } from "../../../../ConnectToStravaListItem";
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

  if (!isLoggedInStrava) {
    return <ConnectToStravaListItem />;
  }

  return (
    <SearchResultCardStravaActivityLoggedIn
      activity={activity}
      onHoverRoute={onHoverRoute}
    />
  );
}

function SearchResultCardStravaActivityLoggedIn({
  activity: { activityId },
  onHoverRoute,
}: Props) {
  const { result: activity, loading } = useAsync(getStravaActivity, [
    activityId,
  ]);
  const [, setLocationState] =
    useLocationState<LocationStateStravaActivities>();
  const setQuery = useStore((state) => state.setQuery);

  if (loading) {
    return <LoadingSpinnerListItem />;
  }

  if (!activity) {
    return (
      <SimpleListItem threeLines>
        An error occurred. Make sure you can access the activity and it was
        recorded in Zwift.
      </SimpleListItem>
    );
  }

  const handleClick = () => {
    setQuery("");
    setLocationState({
      world: activity.world,
      stravaActivityId: activity.id,
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
