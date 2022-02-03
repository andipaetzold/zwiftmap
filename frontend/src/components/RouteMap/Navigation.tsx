import { LatLngTuple } from "leaflet";
import { useAsync } from "react-async-hook";
import { Marker, Polyline, useMapEvent } from "react-leaflet";
import { COLORS } from "../../constants";
import { useNavigationStore } from "../../hooks/useNavigationStore";
import { worker } from "../../services/worker-client";
import { dropAltitude } from "../../util/drop-altitude";
import { POLYLINE_WIDTH } from "./constants";

export function Navigation() {
  const { from, setFrom, to, setTo } = useNavigationStore();

  useMapEvent("click", (e) => {
    const latlng = [e.latlng.lat, e.latlng.lng] as LatLngTuple;
    if (!from) {
      setFrom(latlng);
    } else {
      setTo(latlng);
    }
  });

  const { result: route } = useAsync(async () => {
    if (from === null || to === null) {
      return;
    }

    try {
      return await worker.navigate(from, to);
    } catch {}
  }, [from, to]);

  if (!route) {
    return null;
  }

  return (
    <>
      {route && (
        <>
          {route[0] && <Marker position={dropAltitude(route[0])} />}
          {route[route.length - 1] && (
            <Marker
              interactive={false}
              position={dropAltitude(route[route.length - 1])}
            />
          )}
        </>
      )}
      <Polyline
        positions={route.map((p) => [p[0], p[1]])}
        interactive={false}
        pathOptions={{
          color: COLORS.route,
          weight: POLYLINE_WIDTH,
        }}
      />
    </>
  );
}
