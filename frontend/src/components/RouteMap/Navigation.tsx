import { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { Polyline, useMapEvent } from "react-leaflet";
import { World, WorldSlug } from "zwift-data";
import { COLORS } from "../../constants";
import { WORLD_ROADS } from "../../constants/roads";
import { useStore } from "../../hooks/useStore";
import { findRoute } from "../../services/navigation";
import { Roads } from "../../services/Roads";
import { POLYLINE_WIDTH } from "./constants";

interface Props {
  world: World;
}

export function Navigation({ world }: Props) {
  const { navigationPositions, setNavigationPositions } = useStore();
  const { result: roads } = useAsync<Roads | undefined>(
    async (s: WorldSlug) => WORLD_ROADS[s]?.(),
    [world.slug]
  );

  useMapEvent("click", (e) => {
    setNavigationPositions([
      ...navigationPositions.slice(0, 1),
      [e.latlng.lat, e.latlng.lng],
    ]);
  });

  const route = useMemo(() => {
    if (!roads || navigationPositions.length !== 2) {
      return;
    }

    try {
      return findRoute(navigationPositions[0], navigationPositions[1], roads);
    } catch {}
  }, [navigationPositions, roads]);

  if (!route) {
    return null;
  }

  return (
    <Polyline
      positions={route.map((p) => [p[0], p[1]])}
      interactive={false}
      pathOptions={{
        color: COLORS.route,
        weight: POLYLINE_WIDTH,
      }}
    />
  );
}
