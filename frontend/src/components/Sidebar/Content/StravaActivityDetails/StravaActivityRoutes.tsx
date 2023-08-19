import { ListSubheader } from "@react-md/list";
import { DetailedSegment, DetailedSegmentEffort } from "strava";
import { Route, routes } from "zwift-data";
import { WORLDS_BY_SLUG } from "../../../../constants";
import { StravaActivity } from "../../../../services/StravaActivityRepository";
import { Distance } from "../../../Distance";
import { Elevation } from "../../../Elevation";
import { ListItemState } from "../../../ListItemState";
import { Time } from "../../../Time";

type SegmentEffort = DetailedSegmentEffort & {
  segment: DetailedSegment;
  average_watts: number | null;
};

interface Props {
  activity: StravaActivity;
}

export function StravaActivityRoutes({ activity }: Props) {
  const routesInActivity = activity.segmentEfforts
    .map((segmentEffort) => ({
      route: routes.find(
        (route) =>
          (segmentEffort as SegmentEffort).segment.id === route.stravaSegmentId,
      ),
      segmentEffort,
    }))
    .filter(({ route }) => !!route) as {
    route: Route;
    segmentEffort: SegmentEffort;
  }[];

  if (routesInActivity.length === 0) {
    return null;
  }

  return (
    <>
      <ListSubheader>Routes</ListSubheader>

      {routesInActivity.map(({ route, segmentEffort }) => (
        <ListItemState
          key={segmentEffort.id}
          state={{
            type: "route",
            world: WORLDS_BY_SLUG[route.world],
            route: route,
          }}
          threeLines
          secondaryText={
            <SecondaryText route={route} segmentEffort={segmentEffort} />
          }
        >
          {route.name}
        </ListItemState>
      ))}
    </>
  );
}

interface SecondaryTextProps {
  route: Route;
  segmentEffort: SegmentEffort;
}

function SecondaryText({ segmentEffort, route }: SecondaryTextProps) {
  return (
    <>
      <Distance distance={segmentEffort.distance / 1_000} /> |{" "}
      <Elevation elevation={route.elevation} />
      <br />
      {segmentEffort.average_watts !== null ? (
        <>{Math.round(segmentEffort.average_watts)}W | </>
      ) : null}
      <Time seconds={segmentEffort.moving_time} />
    </>
  );
}
