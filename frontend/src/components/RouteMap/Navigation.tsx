import { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { CircleMarker, useMapEvent } from "react-leaflet";
import { World, WorldSlug } from "zwift-data";
import { WORLD_ROADS } from "../../constants/roads";
import { useStore } from "../../hooks/useStore";
import { SnappedPoint, snapPoint } from "../../services/navigation";
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

  const snappedPoints: SnappedPoint[] = useMemo(() => {
    if (!roads) {
      return [];
    }

    return navigationPositions.map((navPosition) =>
      snapPoint(navPosition, roads)
    );
  }, [navigationPositions, roads]);

  return (
    <>
      {snappedPoints.map((snappedPoint, pointIndex) => (
        <CircleMarker
          key={pointIndex}
          center={snappedPoint.position}
          radius={POLYLINE_WIDTH}
        />
      ))}
    </>
  );
}
