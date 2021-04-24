import { ListItem } from "@react-md/list";
import React, { useRef } from "react";
import { worlds } from "../../data";
import { useOnScreen } from "../../hooks/useOnScreen";
import { Route } from "../../types";
import { Distance } from "../Distance";
import { Elevation } from "../Elevation";
import { ElevationChartPreview } from "../ElevationChartPreview";

export interface Props {
  route: Route;
  onClick: () => void;
  onHoverRoute: (route?: string) => void;
  showWorldName: boolean;
}

export function SearchResultCardRoute({
  route,
  onClick,
  onHoverRoute,
  showWorldName,
}: Props) {
  return (
    <ListItem
      secondaryText={<RouteInfo route={route} showWorldName={showWorldName} />}
      threeLines={showWorldName}
      onClick={onClick}
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
