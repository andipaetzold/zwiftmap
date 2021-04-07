import { LinePaint, LngLatBounds, Map } from "mapbox-gl";
import React, { useEffect, useState } from "react";
import ReactMapboxGl, {
  GeoJSONLayer,
  // ScaleControl,
  ZoomControl,
} from "react-mapbox-gl";
import { FitBounds } from "react-mapbox-gl/lib/map";
import { useQuery } from "react-query";

const MAX_BOUNDS: FitBounds = [
  [166.8778, -11.70256],
  [167.0321, -11.6259],
];
const MIN_ZOOM = 13;
const MAX_ZOOM = 18;

const Mapbox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiYW5kaXBhZXR6b2xkIiwiYSI6ImNqOWgyY2F5NjBnNnAyeXBodzByemRsbWoifQ.wW4aCiUFv2PLhGB2S75sNg",
  minZoom: MIN_ZOOM,
  maxZoom: MAX_ZOOM,
});

const STYLE = "mapbox://styles/andipaetzold/ckn7q8rj60q2f17qxug5shkjq";

const routePaint: LinePaint = {
  "line-color": "#fc6719",
  "line-width": 4,
};

interface Props {
  routeKey: string | undefined;
}

export default function RouteMap({ routeKey }: Props) {
  const { data: geojson } = useQuery(routeKey ?? "", async () => {
    if (!routeKey) {
      return undefined;
    }
    const response = await fetch(
      // @ts-ignore
      `segments/${routeKey}.geojson`
    );
    return await response.json();
  });

  const [map, setMap] = useState<Map | undefined>(undefined);

  useEffect(() => {
    if (!map || !geojson) {
      return;
    }

    const coordinates: [number, number][] = geojson.geometry.coordinates;

    const bounds = coordinates.reduce(
      (bounds, coord) => bounds.extend(coord),
      new LngLatBounds(coordinates[0], coordinates[0])
    );

    map.fitBounds(bounds, {
      padding: 20,
    });
  }, [map, geojson]);

  return (
    <Mapbox
      // eslint-disable-next-line react/style-prop-object
      style={STYLE}
      containerStyle={{
        height: "100vh",
        width: "100vw",
      }}
      maxBounds={MAX_BOUNDS}
      onStyleLoad={(map) => setMap(map)}
    >
      <ZoomControl />
      {/* <ScaleControl /> */}
      {geojson && <GeoJSONLayer data={geojson} linePaint={routePaint} />}
    </Mapbox>
  );
}
