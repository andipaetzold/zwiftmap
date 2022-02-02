import { useAsync } from "react-async-hook";
import { Polyline, useMapEvent } from "react-leaflet";
import { COLORS } from "../../constants";
import { useStore } from "../../hooks/useStore";
import { worker } from "../../services/worker-client";
import { POLYLINE_WIDTH } from "./constants";

export function Navigation() {
  const { navigationPositions, setNavigationPositions } = useStore();

  useMapEvent("click", (e) => {
    setNavigationPositions([
      ...navigationPositions.slice(0, 1),
      [e.latlng.lat, e.latlng.lng],
    ]);
  });

  const { result: route } = useAsync(async () => {
    if (navigationPositions.length !== 2) {
      return;
    }

    try {
      return await worker.navigate(
        navigationPositions[0],
        navigationPositions[1]
      );
    } catch {}
  }, [navigationPositions]);

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
