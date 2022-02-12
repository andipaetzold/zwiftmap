import { CircleMarker, Pane } from "react-leaflet";
import { LocationState } from "../../services/location-state";
import { DistanceStream, LatLngStream } from "../../types";
import { Z_INDEX } from "./constants";
import { RoutingMarkers } from "./routing/RoutingMarkers";

interface Props {
  state: LocationState;

  streams?: {
    latlng: LatLngStream;
    distance: DistanceStream;
  };
}

export function Markers({ state, streams }: Props) {
  return (
    <>
      {state.type === "routing" ? (
        <RoutingMarkers state={state} />
      ) : (
        <>
          {streams && (
            <>
              <Pane name="route-start" style={{ zIndex: Z_INDEX.routeStart }}>
                <CircleMarker
                  center={streams.latlng[0]}
                  radius={5}
                  weight={2}
                  pathOptions={{
                    color: "white",
                    fillColor: "green",
                    fillOpacity: 1,
                  }}
                  interactive={false}
                />
              </Pane>
              <Pane name="route-end" style={{ zIndex: Z_INDEX.routeEnd }}>
                <CircleMarker
                  center={streams.latlng[streams.latlng.length - 1]}
                  radius={5}
                  weight={2}
                  pathOptions={{
                    color: "white",
                    fillColor: "red",
                    fillOpacity: 1,
                  }}
                  interactive={false}
                />
              </Pane>
            </>
          )}
        </>
      )}
    </>
  );
}
