import zipWith from "lodash/zipWith";
import { useAsync } from "react-async-hook";
import { Pane, Polyline } from "react-leaflet";
import { SURFACE_CONSTANTS, worldConfigs } from "../../../../constants";
import { useLocationState } from "../../../../services/location-state";
import { streamToSections } from "../../../../util/sections";
import { getSurfaceStream } from "../../../../util/surface";
import { POLYLINE_WIDTH, Z_INDEX } from "../../constants";
import { loadRoute } from "../../loaders/route";
import { RouteEnd } from "../../RouteEnd";
import { RouteStart } from "../../RouteStart";

const ID = "OverlaySurfaces";

export function OverlaySurfaces() {
  const state = useLocationState();

  const { result: streams } = useAsync(loadRoute, [state]);

  if (!streams) {
    return null;
  }

  const surfaceTypeStream = getSurfaceStream(
    streams.latlng,
    worldConfigs[state.world!.slug].surfaces
  );
  const zippedStream = zipWith(
    streams.latlng,
    surfaceTypeStream,
    (latLng, surface) => ({
      latLng,
      surface,
    })
  );

  const sections = streamToSections(
    zippedStream,
    (a, b) => a.surface === b.surface,
    (item) => item.surface
  );

  return (
    <>
      <Pane name={`${ID}-route`} style={{ zIndex: Z_INDEX.route }}>
        {sections.map((section, sectionIndex) => (
          <Polyline
            key={sectionIndex}
            positions={section.stream.map((item) => item.latLng)}
            pathOptions={{
              color: SURFACE_CONSTANTS[section.ref].color,
              weight: POLYLINE_WIDTH,
              lineCap: "square",
            }}
            interactive={false}
          />
        ))}
      </Pane>
      <RouteStart id={ID} latlng={streams.latlng[0]} />
      <RouteEnd id={ID} latlng={streams.latlng[streams.latlng.length - 1]} />
    </>
  );
}
