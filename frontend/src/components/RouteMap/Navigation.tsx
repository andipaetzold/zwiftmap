import { LatLngTuple, Marker as LeafletMarker } from "leaflet";
import { useCallback, useEffect } from "react";
import { useAsync } from "react-async-hook";
import { Marker, Polyline, useMapEvent } from "react-leaflet";
import { World } from "zwift-data";
import { COLORS } from "../../constants";
import { useNavigationStore } from "../../hooks/useNavigationStore";
import { worker } from "../../services/worker-client";
import { POLYLINE_WIDTH } from "./constants";

interface Props {
  world: World;
}

export function Navigation({ world }: Props) {
  const { from, setFrom, to, setTo } = useNavigationStore();

  useMapEvent("click", async (e) => {
    if (from && to) {
      return;
    }

    const latlng = [e.latlng.lat, e.latlng.lng] as LatLngTuple;
    const snapped = await worker.snapPoint(latlng, world.slug);
    if (!from) {
      setFrom(snapped.position);
    } else {
      setTo(snapped.position);
    }
  });

  const updateMarker = useCallback(
    async (marker: LeafletMarker, setter: (latlng: LatLngTuple) => void) => {
      const latlng = marker.getLatLng();
      const snapped = await worker.snapPoint(
        [latlng.lat, latlng.lng],
        world.slug
      );
      setter(snapped.position);
    },
    [world.slug]
  );

  useEffect(() => {
    worker.fetchRoads(world.slug);
  }, [world.slug]);

  const { result: route } = useAsync(
    async () => {
      if (from === null || to === null) {
        return;
      }

      return await worker.navigate(from, to, world.slug);
    },
    [from, to, world.slug],
    { setLoading: (state) => ({ ...state, loading: true }) }
  );

  return (
    <>
      {from && (
        <Marker
          draggable
          autoPan
          position={from}
          eventHandlers={{
            dragend: (e) => updateMarker(e.target, setFrom),
          }}
        />
      )}
      {to && (
        <Marker
          draggable
          autoPan
          position={to}
          eventHandlers={{
            dragend: (e) => updateMarker(e.target, setTo),
          }}
        />
      )}
      {route && (
        <Polyline
          positions={route.map((p) => [p[0], p[1]])}
          interactive={false}
          pathOptions={{
            color: COLORS.route,
            weight: POLYLINE_WIDTH,
          }}
        />
      )}
    </>
  );
}
