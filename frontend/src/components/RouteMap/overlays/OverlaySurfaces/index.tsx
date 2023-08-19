import zipWith from "lodash-es/zipWith";
import { Pane, Polyline } from "react-leaflet";
import { SURFACE_CONSTANTS, worldConfigs } from "../../../../constants";
import { useStore } from "../../../../hooks/useStore";
import { LocationState } from "../../../../services/location-state";
import {
  DistanceStream,
  HoverStateType,
  LatLngStream,
} from "../../../../types";
import { streamToSections } from "../../../../util/sections";
import { getSurfaceStream } from "../../../../util/surface";
import {
  POLYLINE_WIDTH,
  POLYLINE_WIDTH_HIGHLIGHTED,
  Z_INDEX,
} from "../../constants";

const ID = "OverlaySurfaces";

interface Props {
  state: LocationState;

  streams?: {
    latlng: LatLngStream;
    distance: DistanceStream;
  };
}

export function OverlaySurfaces({ state, streams }: Props) {
  const hoverState = useStore((state) => state.hoverState);

  if (!streams || !state.world) {
    return null;
  }

  const surfaceTypeStream = getSurfaceStream(
    streams.latlng,
    worldConfigs[state.world.slug].surfaces,
  );
  const zippedStream = zipWith(
    streams.latlng,
    surfaceTypeStream,
    (latLng, surface) => ({
      latLng,
      surface,
    }),
  );

  const sections = streamToSections(
    zippedStream,
    (a, b) => a.surface === b.surface,
    (item) => item.surface,
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
              weight:
                hoverState?.type === HoverStateType.HighlightSurface &&
                hoverState.surface === section.ref
                  ? POLYLINE_WIDTH_HIGHLIGHTED
                  : POLYLINE_WIDTH,
              lineCap: "square",
            }}
            interactive={false}
          />
        ))}
      </Pane>
    </>
  );
}
