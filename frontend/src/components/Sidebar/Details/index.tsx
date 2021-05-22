import React from "react";
import { useLocationState } from "../../../hooks/useLocationState";
import { RouteDetails } from "./RouteDetails";
import { WorldDetails } from "./WorldDetails";

interface Props {
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
  backButtonText: string;
  onBackButtonClick: () => void;
}

export function Details({
  onMouseHoverDistanceChange,
  backButtonText,
  onBackButtonClick,
}: Props) {
  const [locationState] = useLocationState();

  if (locationState.route) {
    return (
      <RouteDetails
        route={locationState.route}
        onMouseHoverDistanceChange={onMouseHoverDistanceChange}
        backButtonText={backButtonText}
        onBackButtonClick={onBackButtonClick}
      />
    );
  } else {
    return <WorldDetails world={locationState.world} />;
  }
}
