import { useMemo } from "react";
import { CircleMarker, Pane } from "react-leaflet";
import { DistanceStream, LatLngStream } from "../../types";

interface Props {
  hoverDistance?: number;
  streams?: {
    latlng: LatLngStream;
    distance: DistanceStream;
  };
}

export function RoutePosition({ hoverDistance, streams }: Props) {
  const coordinates = useMemo(() => {
    if (!streams || !hoverDistance) {
      return;
    }

    const pointIndex = streams.distance.findIndex(
      (d) => d > hoverDistance * 1_000
    );
    if (!pointIndex) {
      return;
    }
    return streams.latlng[pointIndex];
  }, [streams, hoverDistance]);

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
