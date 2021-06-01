import { ListItem } from "@react-md/list";
import React, { useRef } from "react";
import { Route, worlds } from "zwift-data";
import { useLocationState } from "../../hooks/useLocationState";
import { useOnScreen } from "../../hooks/useOnScreen";
import { Distance } from "../Distance";
import { Elevation } from "../Elevation";
import { ElevationChartPreview } from "../ElevationChartPreview";

export interface Props {
  route: Route;
  onHoverRoute: (route?: string) => void;
  showWorldName: boolean;
}

export function ListItemRoute({ route, onHoverRoute, showWorldName }: Props) {
  const [locationState, setLocationState] = useLocationState();
  const handleClick = () => {
    setLocationState({
      world: worlds.find((w) => w.slug === route.world)!,
      route,
      segments: [],
      query: locationState.query,
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
      onMouseEnter={() => onHoverRoute(route.slug)}
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
      {onScreen ? <ElevationChartPreview route={route} /> : null}
    </div>
  );
}
