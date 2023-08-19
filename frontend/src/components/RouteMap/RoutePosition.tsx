import { useMemo } from "react";
import { CircleMarker, Pane } from "react-leaflet";
import { useStore } from "../../hooks/useStore";
import { DistanceStream, HoverStateType, LatLngStream } from "../../types";

interface Props {
  streams?: {
    latlng: LatLngStream;
    distance: DistanceStream;
  };
}

export function RoutePosition({ streams }: Props) {
  const hoverState = useStore((store) => store.hoverState);

  const coordinates = useMemo(() => {
    if (!hoverState || hoverState.type !== HoverStateType.Distance) {
      return;
    }

    if (!streams) {
      return;
    }

    const pointIndex = streams.distance.findIndex(
      (d) => d > hoverState.distance * 1_000,
    );
    if (!pointIndex) {
      return;
    }
    return streams.latlng[pointIndex];
  }, [streams, hoverState]);

  if (!coordinates) {
    return null;
  }

  return (
    <Pane name="mouse-position" style={{ zIndex: 508 }}>
      <CircleMarker
        center={coordinates}
        radius={5}
        weight={2}
        pathOptions={{
          color: "white",
          fillColor: "black",
          fillOpacity: 1,
        }}
        interactive={false}
      />
    </Pane>
  );
}
