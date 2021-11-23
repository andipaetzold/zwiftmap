import React, { useCallback } from "react";
import { useStore } from "../../../hooks/useStore";
import {
  DEFAULT_WORLD,
  useLocationState,
} from "../../../services/location-state";
import { HoverData } from "../../../types";
import { Event } from "./Event";
import { RouteList } from "./Lists/RouteList";
import { SearchResultList } from "./Lists/SearchResultList";
import { StravaActivitiesList } from "./Lists/StravaActivitiesList";
import { RouteDetails } from "./RouteDetails";
import { Share } from "./Share";
import { StravaActivityDetails } from "./StravaActivityDetails";
import { UpcomingEvents } from "./UpcomingEvents";

interface Props {
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
  onHoverRoute: (data: HoverData) => void;
}

export function Content({ onMouseHoverDistanceChange, onHoverRoute }: Props) {
  const [locationState, setLocationState] = useLocationState();
  const query = useStore((state) => state.query);

  const backButtonText = query === "" ? "Route List" : "Search Results";
  const onBackButtonClick = useCallback(() => {
    setLocationState({
      world: locationState.world ?? DEFAULT_WORLD,
      type: "default",
    });
  }, [setLocationState, locationState]);

  switch (locationState.type) {
    case "route":
      return (
        <RouteDetails
          key={locationState.route.slug}
          backButtonText={backButtonText}
          onBackButtonClick={onBackButtonClick}
          onMouseHoverDistanceChange={onMouseHoverDistanceChange}
          route={locationState.route}
        />
      );
    case "strava-activity":
      return (
        <StravaActivityDetails
          activityId={locationState.stravaActivityId}
          onMouseHoverDistanceChange={onMouseHoverDistanceChange}
        />
      );
    case "strava-activities":
      return <StravaActivitiesList onHoverRoute={onHoverRoute} />;
    case "events":
      return <UpcomingEvents onHoverRoute={onHoverRoute} />;
    case "event":
      return (
        <Event
          onMouseHoverDistanceChange={onMouseHoverDistanceChange}
          eventId={locationState.eventId}
        />
      );
    case "share":
      return (
        <Share
          shareId={locationState.shareId}
          backButtonText={backButtonText}
          onBackButtonClick={onBackButtonClick}
          onMouseHoverDistanceChange={onMouseHoverDistanceChange}
        />
      );
    case "default":
      if (query === "") {
        return <RouteList onHoverRoute={onHoverRoute} />;
      } else {
        return <SearchResultList onHoverRoute={onHoverRoute} query={query} />;
      }
  }
}
