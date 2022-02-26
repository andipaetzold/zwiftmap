import { useStore } from "../../../hooks/useStore";
import {
  DEFAULT_WORLD,
  LocationState,
  useLocationState,
} from "../../../services/location-state";
import { Event } from "./Event";
import { RouteList } from "./Lists/RouteList";
import { SearchResultList } from "./Lists/SearchResultList";
import { StravaActivitiesList } from "./Lists/StravaActivitiesList";
import { CustomRoute } from "./CustomRoute";
import { RouteDetails } from "./RouteDetails";
import { SegmentDetails } from "./SegmentDetails";
import { Share } from "./Share";
import { StravaActivityDetails } from "./StravaActivityDetails";
import { UpcomingEvents } from "./UpcomingEvents";

export function Content() {
  const state = useLocationState();
  const query = useStore((state) => state.query);

  const backButtonText = query === "" ? "Route List" : "Search Results";
  const backButtonState: LocationState = {
    world: state.world ?? DEFAULT_WORLD,
    type: "default",
  };

  switch (state.type) {
    case "route":
      return (
        <RouteDetails
          key={state.route.slug}
          backButtonText={backButtonText}
          backButtonState={backButtonState}
          route={state.route}
        />
      );
    case "segment":
      return (
        <SegmentDetails
          key={state.segment.slug}
          backButtonText={backButtonText}
          backButtonState={backButtonState}
          segment={state.segment}
        />
      );
    case "strava-activity":
      return <StravaActivityDetails state={state} />;
    case "strava-activities":
      return <StravaActivitiesList state={state} />;
    case "events":
      return <UpcomingEvents state={state} />;
    case "event":
      return <Event eventId={state.eventId} />;
    case "share":
      return (
        <Share
          shareId={state.shareId}
          backButtonText={backButtonText}
          backButtonState={backButtonState}
        />
      );
    case "custom-route":
      return <CustomRoute state={state} />;
    case "default":
      if (query === "") {
        return <RouteList state={state} />;
      } else {
        return <SearchResultList query={query} />;
      }
  }
}
