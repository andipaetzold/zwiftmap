import polyline from "@mapbox/polyline";
import { SimpleListItem } from "@react-md/list";
import * as Sentry from "@sentry/react";
import { useAsync } from "react-async-hook";
import { useStore } from "../../../../../hooks/useStore";
import { LocationStateStravaActivities } from "../../../../../services/location-state";
import { ErrorWithStatus } from "../../../../../services/request";
import { getStravaActivities } from "../../../../../services/zwiftMapApi";
import { HoverStateType } from "../../../../../types";
import { getWorld } from "../../../../../util/strava";
import { Distance } from "../../../../Distance";
import { Elevation } from "../../../../Elevation";
import { ListItemState } from "../../../../ListItemState";
import { LoadingSpinnerListItem } from "../../../../Loading";
import { Time } from "../../../../Time";

interface Props {
  state: LocationStateStravaActivities;
}

export function StravaActivitiesListComponent({ state }: Props) {
  const setHoverState = useStore((store) => store.setHoverState);
  const {
    result: activities,
    loading,
    error,
  } = useAsync(getStravaActivities, [], {
    onError: (e) => Sentry.captureException(e),
  });

  if (error) {
    if (error instanceof ErrorWithStatus && error.status === 429) {
      return (
        <SimpleListItem threeLines>
          ZwiftMap received too many requests and got rate limited by Strava.
          <br />
          Please try again in a few minutes.
        </SimpleListItem>
      );
    }

    return <SimpleListItem>An error occurred</SimpleListItem>;
  }

  if (loading || activities === undefined) {
    return <LoadingSpinnerListItem />;
  }

  return (
    <>
      {activities
        .map((activity) => ({
          world: getWorld(activity.start_latlng)!,
          activity,
        }))
        .map(({ world, activity }) => (
          <ListItemState
            key={activity.id}
            state={{
              world,
              type: "strava-activity",
              stravaActivityId: activity.id,
            }}
            query=""
            onClick={() => setHoverState(undefined)}
            onMouseEnter={() => {
              if (world !== state.world) {
                setHoverState(undefined);
                return;
              }

              setHoverState({
                type: HoverStateType.PreviewLatLngStream,
                latLngStream: polyline.decode(activity.map.summary_polyline),
              });
            }}
            onMouseLeave={() => setHoverState(undefined)}
            secondaryText={
              <>
                <Distance distance={activity.distance / 1_000} /> |{" "}
                <Elevation elevation={activity.total_elevation_gain} />
                <br />
                {activity.average_watts && (
                  <>{Math.round(activity.average_watts)}W | </>
                )}
                <Time seconds={activity.moving_time} />
              </>
            }
            threeLines
          >
            {activity.name}
          </ListItemState>
        ))}
    </>
  );
}
