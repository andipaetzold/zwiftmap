import { useAsync } from "react-async-hook";
import { Pane, Polyline } from "react-leaflet";
import { COLORS } from "../../../constants";
import { useLocationState } from "../../../services/location-state";
import { Z_INDEX } from "../constants";
import { loadRoute } from "../loaders/route";
import { loadSegments } from "../loaders/segments";
import { RouteEnd } from "../RouteEnd";
import { RouteStart } from "../RouteStart";

export function OverlaySegments() {
  const [state] = useLocationState();

  const { result: streams } = useAsync(loadRoute, [state]);
  const { result: segments } = useAsync(loadSegments, [state]);

  if (!streams) {
    return null;
  }

  return (
    <>
      <Pane name="route-segments" style={{ zIndex: Z_INDEX.route }}>
        <Polyline
          positions={streams.latlng}
          pathOptions={{ color: COLORS.route, weight: 5 }}
          interactive={false}
        />
      </Pane>
      <RouteStart id="segments" latlng={streams.latlng[0]} />
      <RouteEnd
        id="segments"
        latlng={streams.latlng[streams.latlng.length - 1]}
      />

      {segments && (
        <Pane name="segments" style={{ zIndex: Z_INDEX.segments }}>
          {segments
            .filter((s) => ["sprint", "climb"].includes(s.type))
            .map((s, segmentIndex) => (
              <Polyline
                key={segmentIndex}
                positions={s.latlng}
                pathOptions={{
                  color:
                    s.type === "sprint"
                      ? COLORS.sprintSegment
                      : COLORS.komSegment,
                  weight: 8,
                }}
                interactive={false}
              />
            ))}
        </Pane>
      )}
    </>
  );
}
