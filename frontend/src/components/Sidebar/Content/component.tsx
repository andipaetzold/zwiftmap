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
          onMouseHoverDistanceChange={onMouseHoverDistanceChange}
          route={state.route}
        />
      );
    case "segment":
      return (
        <SegmentDetails
          key={state.segment.slug}
          backButtonText={backButtonText}
          backButtonState={backButtonState}
          onMouseHoverDistanceChange={onMouseHoverDistanceChange}
          segment={state.segment}
          onHoverRoute={onHoverRoute}
        />
      );
    case "strava-activity":
      return (
        <StravaActivityDetails
          state={state}
          onMouseHoverDistanceChange={onMouseHoverDistanceChange}
        />
      );
    case "strava-activities":
      return <StravaActivitiesList state={state} onHoverRoute={onHoverRoute} />;
    case "events":
      return <UpcomingEvents state={state} onHoverRoute={onHoverRoute} />;
    case "event":
      return (
        <Event
          onMouseHoverDistanceChange={onMouseHoverDistanceChange}
          eventId={state.eventId}
        />
      );
    case "share":
      return (
        <Share
          shareId={state.shareId}
          backButtonText={backButtonText}
          backButtonState={backButtonState}
          onMouseHoverDistanceChange={onMouseHoverDistanceChange}
        />
      );
    case "default":
      if (query === "") {
        return <RouteList state={state} onHoverRoute={onHoverRoute} />;
      } else {
        return <SearchResultList onHoverRoute={onHoverRoute} query={query} />;
      }
  }
}
