import { ListItem, ListSubheader } from "@react-md/list";
import { DetailedSegment, DetailedSegmentEffort } from "strava";
import { Route, routes, worlds } from "zwift-data";
import { useLocationState } from "../../../../services/location-state";
import { StravaActivity } from "../../../../services/StravaActivityRepository";
import { Distance } from "../../../Distance";
import { Elevation } from "../../../Elevation";
import { Time } from "../../../Time";

type SegmentEffort = DetailedSegmentEffort & {
  segment: DetailedSegment;
  average_watts: number | null;
};

interface Props {
  activity: StravaActivity;
}

export function StravaActivityRoutes({ activity }: Props) {
  const [locationStste, setLocationState] = useLocationState();

  const routesInActivity = activity.segmentEfforts
    .map((segmentEffort) => ({
      route: routes.find(
        (route) =>
          (segmentEffort as SegmentEffort).segment.id === route.stravaSegmentId
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
        <ListItem
          key={segmentEffort.id}
          onClick={() =>
            setLocationState({
              type: "route",
              world: worlds.find((w) => w.slug === route.world)!,
              route: route,
              segments: [],
              query: locationStste.query,
            })
          }
          threeLines
          secondaryText={
            <SecondaryText route={route} segmentEffort={segmentEffort} />
          }
        >
          {route.name}
        </ListItem>
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
