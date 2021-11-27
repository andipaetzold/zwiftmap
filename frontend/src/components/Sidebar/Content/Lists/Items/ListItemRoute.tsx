import { ListItem } from "@react-md/list";
import React, { useRef } from "react";
import { Route, worlds } from "zwift-data";
import { useOnScreen } from "../../../../../hooks/useOnScreen";
import {
  LocationStateDefault,
  useLocationState,
} from "../../../../../services/location-state";
import { HoverData } from "../../../../../types";
import { Distance } from "../../../../Distance";
import { Elevation } from "../../../../Elevation";
import { RouteElevationChartPreview } from "../../../../ElevationChartPreview";

export interface Props {
  route: Route;
  onHoverRoute: (data: HoverData) => void;
  showWorldName: boolean;
}

export function ListItemRoute({ route, onHoverRoute, showWorldName }: Props) {
  const [, setLocationState] =
    useLocationState<LocationStateDefault>();
  const handleClick = () => {
    setLocationState({
      world: worlds.find((w) => w.slug === route.world)!,
      route,
      segments: [],
      type: "route",
    });
    onHoverRoute(undefined);
  };

  return (
    <ListItem
      secondaryText={<RouteInfo route={route} showWorldName={showWorldName} />}
      threeLines={showWorldName}
      onClick={handleClick}
      rightAddonType="large-media"
      rightAddon={<ChartContainer route={route} />}
      onMouseEnter={() => onHoverRoute({ type: "route", route: route.slug })}
      onMouseLeave={() => onHoverRoute(undefined)}
    >
      {route.name}
    </ListItem>
  );
}

interface RouteInfoProps {
  route: Route;
  showWorldName: boolean;
}

function RouteInfo({ route, showWorldName }: RouteInfoProps) {
  return (
    <>
      {showWorldName && (
        <>
          {worlds.find((w) => w.slug === route.world)!.name}
          <br />
        </>
      )}
      <Distance distance={route.distance} /> |{" "}
      <Elevation elevation={route.elevation} />
    </>
  );
}

interface ChartProps {
  route: Route;
}

function ChartContainer({ route }: ChartProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onScreen = useOnScreen(ref);

  return (
    <div ref={ref} style={{ width: "100%", pointerEvents: "none" }}>
      {onScreen ? <RouteElevationChartPreview route={route} /> : null}
    </div>
  );
}
