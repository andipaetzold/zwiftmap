import { SimpleListItem } from "@react-md/list";
import { useAsync } from "react-async-hook";
import { useIsLoggedInStrava } from "../../../../../hooks/useIsLoggedInStrava";
import { getStravaActivity } from "../../../../../services/StravaActivityRepository";
import { ConnectToStravaListItem } from "../../../../ConnectToStravaListItem";
import { Distance } from "../../../../Distance";
import { Elevation } from "../../../../Elevation";
import { ListItemState } from "../../../../ListItemState";
import { LoadingSpinnerListItem } from "../../../../Loading";
import { Time } from "../../../../Time";

export interface Props {
  activity: { activityId: number; slug: string };
}

export function ListItemStravaActivity({ activity }: Props) {
  const isLoggedInStrava = useIsLoggedInStrava();

  if (!isLoggedInStrava) {
    return <ConnectToStravaListItem />;
  }

  return <SearchResultCardStravaActivityLoggedIn activity={activity} />;
}

function SearchResultCardStravaActivityLoggedIn({
  activity: { activityId },
}: Props) {
  const { result: activity, loading } = useAsync(getStravaActivity, [
    activityId,
  ]);

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

  return (
    <ListItemState
      query=""
      state={{
        world: activity.world,
        stravaActivityId: activity.id,
        type: "strava-activity",
      }}
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
    </ListItemState>
  );
}
