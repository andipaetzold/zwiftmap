import { Icon, LatLngTuple, Marker as LeafletMarker } from "leaflet";
import { range } from "lodash";
import { useCallback, useEffect } from "react";
import { useAsync } from "react-async-hook";
import { Marker, Polyline, useMapEvent } from "react-leaflet";
import { COLORS } from "../../constants";
import { LocationStateRouting, navigate } from "../../services/location-state";
import { worker } from "../../services/worker-client";
import { dropAltitude } from "../../util/drop-altitude";
import { POLYLINE_WIDTH } from "./constants";

interface Props {
  state: LocationStateRouting;
}

export function Routing({ state }: Props) {
  useMapEvent("click", async (e) => {
    if (
      state.points.filter((p) => p !== null).length >= 2 &&
      state.points[state.points.length - 1]
    ) {
      return;
    }

    const latlng = [e.latlng.lat, e.latlng.lng] as LatLngTuple;
    const snapped = await worker.snapPoint(latlng, state.world.slug);
    const snappedWithoutAltitude = dropAltitude(snapped.position);

    const index = state.points[0] ? state.points.length - 1 : 0;

    navigate({
      ...state,
      points: state.points.map((p, i) =>
        i === index ? snappedWithoutAltitude : p
      ),
    });
  });

  const updateMarker = useCallback(
    async (marker: LeafletMarker, pointIndex) => {
      const latlng = marker.getLatLng();
      const snapped = await worker.snapPoint(
        [latlng.lat, latlng.lng],
        state.world.slug
      );

      navigate({
        ...state,
        points: state.points.map((point, index) =>
          index === pointIndex ? dropAltitude(snapped.position) : point
        ),
      });
    },
    [state]
  );

  useEffect(() => {
    worker.fetchRoads(state.world.slug);
  }, [state.world.slug]);

  const { result: routes } = useAsync(
    async () => {
      const nonNullPoints = state.points.filter(
        (p): p is LatLngTuple => p !== null
      );

      if (nonNullPoints.length < 2) {
        return;
      }

      return await Promise.all(
        range(0, nonNullPoints.length - 1).map((index) =>
          worker.navigate(
            nonNullPoints[index],
            nonNullPoints[index + 1],
            state.world.slug
          )
        )
      );
    },
    [state.points, state.world.slug],
    { setLoading: (state) => ({ ...state, loading: true }) }
  );

  return (
    <>
      {state.points
        .filter((p): p is LatLngTuple => p !== null)
        .map((point, index) => {
          const icon = new Icon({
            iconUrl: `data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 31 48' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve'%3E%3Cg transform='matrix(0.0881867,0,0,0.0881867,-0.62934,-0.679037)'%3E%3Cpath d='M182.9,551.7C182.9,551.8 183.1,552 183.1,552C183.1,552 358.3,283 358.3,194.6C358.3,64.5 269.5,7.9 182.9,7.7C96.3,7.9 7.5,64.5 7.5,194.6C7.5,283 182.8,552 182.8,552L182.9,551.7Z' style='fill:%232196F3' /%3E%3C/g%3E%3Ctext x='15' y='26' style='font-size: 24px; font-family: Roboto; fill: white' text-anchor='middle'%3E${
              index + 1
            }%3C/text%3E%3C/svg%3E`,
            iconRetinaUrl: undefined,
            shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
            iconSize: [31, 48],
            iconAnchor: [31 / 2, 48],
            shadowSize: [41, 41],
          });
          return (
            <Marker
              key={index}
              draggable
              position={point}
              eventHandlers={{ dragend: (e) => updateMarker(e.target, index) }}
              icon={icon}
            />
          );
        })}
      {routes?.map((route, routeIndex) => (
        <Polyline
          key={routeIndex}
          positions={route.map(dropAltitude)}
          interactive={false}
          pathOptions={{
            color: COLORS.route,
            weight: POLYLINE_WIDTH,
          }}
        />
      ))}
    </>
  );
}
