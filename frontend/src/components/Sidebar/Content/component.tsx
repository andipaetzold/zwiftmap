import React from "react";
import { useStore } from "../../../hooks/useStore";
import {
  DEFAULT_WORLD,
  LocationState,
  useLocationState,
} from "../../../services/location-state";
import { HoverData } from "../../../types";
import { Event } from "./Event";
import { RouteList } from "./Lists/RouteList";
import { SearchResultList } from "./Lists/SearchResultList";
import { StravaActivitiesList } from "./Lists/StravaActivitiesList";
import { RouteDetails } from "./RouteDetails";
import { SegmentDetails } from "./SegmentDetails";
import { Share } from "./Share";
import { StravaActivityDetails } from "./StravaActivityDetails";
import { UpcomingEvents } from "./UpcomingEvents";

interface Props {
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
  onHoverRoute: (data: HoverData) => void;
}

export function Content({ onMouseHoverDistanceChange, onHoverRoute }: Props) {
  const [locationState] = useLocationState();
  const query = useStore((state) => state.query);

  const backButtonText = query === "" ? "Route List" : "Search Results";
  const backButtonState: LocationState = {
    world: locationState.world ?? DEFAULT_WORLD,
    type: "default",
  };

  switch (locationState.type) {
    case "route":
      return (
        <RouteDetails
          key={locationState.route.slug}
          backButtonText={backButtonText}
          backButtonState={backButtonState}
          onMouseHoverDistanceChange={onMouseHoverDistanceChange}
          route={locationState.route}
        />
      );
    case "segment":
      return (
        <SegmentDetails
          key={locationState.segment.slug}
          backButtonText={backButtonText}
          backButtonState={backButtonState}
          onMouseHoverDistanceChange={onMouseHoverDistanceChange}
          segment={locationState.segment}
          onHoverRoute={onHoverRoute}
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
          backButtonState={backButtonState}
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
