import { useStore } from "../../../hooks/useStore";
import {
  DEFAULT_WORLD,
  LocationState,
  useLocationState,
} from "../../../services/location-state";
import { CustomRoute } from "./CustomRoute";
import { Event } from "./Event";
import { Fog } from "./Fog";
import { RouteList } from "./Lists/RouteList";
import { SearchResultList } from "./Lists/SearchResultList";
import { StravaActivitiesList } from "./Lists/StravaActivitiesList";
import { Place } from "./Place";
import { PlaceEdit } from "./PlaceEdit";
import { PlaceNew } from "./PlaceNew";
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
      return <Event state={state} />;
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
    case "fog":
      return <Fog state={state} />;
    case "place-new":
      return <PlaceNew state={state} />;
    case "place":
      return <Place state={state} />;
    case "place-edit":
      return <PlaceEdit state={state} />;
    case "default":
      if (query === "") {
        return <RouteList state={state} />;
      } else {
        return <SearchResultList query={query} />;
      }
  }
}
