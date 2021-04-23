import { ListItem } from "@react-md/list";
import round from "lodash/round";
import React, { useRef } from "react";
import { useOnScreen } from "../../hooks/useOnScreen";
import { Route } from "../../types";
import { ElevationChartPreview } from "../ElevationChartPreview";

export interface Props {
  route: Route;
  onClick: () => void;
  onHoverRoute: (route?: string) => void;
}

export function SearchResultCardRoute({ route, onClick, onHoverRoute }: Props) {
  return (
    <ListItem
      secondaryText={getRouteInfo(route)}
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

function getRouteInfo(route: Route) {
  return `${round(route.distance, 1)}km | ${round(route.elevation)}m`;
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
