import { Helmet } from "react-helmet";
import {
  createUrl,
  LocationState,
  useLocationState,
} from "../../services/location-state";

export function Head() {
  const [locationState] = useLocationState();

  return (
    <Helmet>
      <title>{getTitle(locationState)} - ZwiftMap</title>
      <link
        rel="canonical"
        href={`${window.origin}${createUrl(locationState)}`}
      />
    </Helmet>
  );
}

function getTitle(locationState: LocationState) {
  switch (locationState.type) {
    case "default":
      return locationState.world.name;
    case "route":
      return locationState.route.name;
    case "segment":
      return locationState.segment.name;
    case "event":
      return "Event";
    case "events":
      return "Events";
    case "strava-activities":
      return "Strava Activities";
    case "strava-activity":
      return "Strava Activity";
    case "share":
      return "Shared Activity";
  }
}
