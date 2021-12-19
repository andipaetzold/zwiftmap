import polyline from "@mapbox/polyline";
import { SimpleListItem } from "@react-md/list";
import * as Sentry from "@sentry/react";
import axios from "axios";
import { useAsync } from "react-async-hook";
import {
  LocationStateStravaActivities
} from "../../../../../services/location-state";
import { getStravaActivities } from "../../../../../services/zwiftMapApi";
import { HoverData } from "../../../../../types";
import { getWorld } from "../../../../../util/strava";
import { Distance } from "../../../../Distance";
import { Elevation } from "../../../../Elevation";
import { ListItemState } from "../../../../ListItemState";
import { LoadingSpinnerListItem } from "../../../../Loading";
import { Time } from "../../../../Time";

interface Props {
  state: LocationStateStravaActivities;
  onHoverRoute: (data: HoverData) => void;
}

export function StravaActivitiesListComponent({ state, onHoverRoute }: Props) {
  const {
    result: activities,
    loading,
    error,
  } = useAsync(getStravaActivities, [], {
    onError: (e) => Sentry.captureException(e),
  });

  if (error) {
    if (axios.isAxiosError(error) && error.response?.status === 429) {
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
              world: world!,
              type: "strava-activity",
              stravaActivityId: activity.id,
            }}
            query=""
            onClick={() => onHoverRoute(undefined)}
            onMouseEnter={() => {
              if (world !== state.world) {
                onHoverRoute(undefined);
                return;
              }

              onHoverRoute({
                type: "latlng",
                latlng: polyline.decode(activity.map.summary_polyline),
              });
            }}
            onMouseLeave={() => onHoverRoute(undefined)}
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
