import React, { useRef } from "react";
import { Route, worlds } from "zwift-data";
import { HoverData } from "../../types";
import { isSaveDataMode } from "../../util/saveData";
import { useOnScreen } from "..//../hooks/useOnScreen";
import { Distance } from "../Distance";
import { Elevation } from "../Elevation";
import { RouteElevationChartPreview } from "../ElevationChartPreview";
import { ListItemState } from "../ListItemState";

export interface Props {
  route: Route;
  onHoverRoute: (data: HoverData) => void;
  showWorldName: boolean;
}

export function ListItemRoute({ route, onHoverRoute, showWorldName }: Props) {
  const showPreviewChart = !isSaveDataMode();

  return (
    <ListItemState
      role="listitem"
      secondaryText={<RouteInfo route={route} showWorldName={showWorldName} />}
      threeLines={showWorldName}
      state={{
        world: worlds.find((w) => w.slug === route.world)!,
        route,
        type: "route",
      }}
      onClick={() => onHoverRoute(undefined)}
      rightAddonType={showPreviewChart ? "large-media" : undefined}
      rightAddon={showPreviewChart ? <ChartContainer route={route} /> : null}
      onMouseEnter={() => onHoverRoute({ type: "route", route: route.slug })}
      onMouseLeave={() => onHoverRoute(undefined)}
    >
      {route.name}
    </ListItemState>
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
      <Distance distance={route.distance} /> <span aria-hidden="true">|</span>{" "}
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
