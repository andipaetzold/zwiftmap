import * as Sentry from "@sentry/react";
import { LatLngTuple } from "leaflet";
import { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { Pane, Polyline } from "react-leaflet";
import { segments, SegmentType } from "zwift-data";
import { COLORS, getSegmentColor } from "../../../constants";
import {
  LocationStateRoute,
  useLocationState,
} from "../../../services/location-state";
import { getStravaSegmentStream } from "../../../services/StravaSegmentRepository";
import { Z_INDEX } from "../constants";
import { loadRoute } from "../loaders/route";
import { RouteEnd } from "../RouteEnd";
import { RouteStart } from "../RouteStart";
import { OverlayNone } from "./OverlayNone";

const SEGMENTS_TO_DISPLAY: SegmentType[] = ["sprint", "climb"];

export function OverlaySegments() {
  const [state] = useLocationState();

  if (state.type !== "route") {
    return <OverlayNone />;
  }

  return <RouteSegmentsOverlay />;
}

function RouteSegmentsOverlay() {
  const [state] = useLocationState<LocationStateRoute>();

  const unmatchedSegments = useMemo(() => {
    const matchedSegmentSlugs = state.route.segmentsOnRoute.map(
      (sor) => sor.segment
    );

    return state.route.segments.filter(
      (segmentSlug) => !matchedSegmentSlugs.includes(segmentSlug)
    );
  }, [state.route]);

  const { result: streams } = useAsync(loadRoute, [state]);
  const { result: segmentsData } = useAsync(loadSegments, [unmatchedSegments]);

  if (!streams) {
    return null;
  }

  const sections = getRouteSections(streams, state.route.segmentsOnRoute);

  return (
    <>
      {sections.map((section, sectionIndex) => (
        <Pane
          key={sectionIndex}
          name={`route-segments-${sectionIndex}`}
          style={{ zIndex: Z_INDEX.route }}
        >
          <Polyline
            positions={section.latlng}
            pathOptions={{
              color:
                section.type === "regular"
                  ? COLORS.route
                  : getSegmentColor(section.type),
              weight: 5,
            }}
            interactive={false}
          />
        </Pane>
      ))}
      <RouteStart id="segments" latlng={streams.latlng[0]} />
      <RouteEnd
        id="segments"
        latlng={streams.latlng[streams.latlng.length - 1]}
      />

      {segmentsData && (
        <Pane name="segments" style={{ zIndex: Z_INDEX.segments }}>
          {segmentsData
            .filter((s) => SEGMENTS_TO_DISPLAY.includes(s.type))
            .map((s, segmentIndex) => (
              <Polyline
                key={segmentIndex}
                positions={s.latlng}
                pathOptions={{
                  color: getSegmentColor(s.type),
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

function getRouteSections(
  streams: {
    latlng: LatLngTuple[];
    distance: number[];
  },
  segmentsOnRoute: ReadonlyArray<{
    from: number;
    to: number;
    segment: string;
  }>
) {
  const sections: {
    latlng: LatLngTuple[];
    type: "regular" | "sprint" | "climb";
  }[] = [];

  const indexCount = streams.latlng.length;

  let prevType: "regular" | "sprint" | "climb" | undefined = undefined;
  let curLatLng: LatLngTuple[] = [];
  for (let i = 0; i < indexCount; ++i) {
    const distance = streams.distance[i];
    const latlng = streams.latlng[i];

    const segmentSlug = segmentsOnRoute.find(
      (sor) => sor.from * 1_000 < distance && sor.to * 1_000 >= distance
    )?.segment;

    const type = segmentSlug
      ? (segments.find((s) => s.slug === segmentSlug && s.type !== "segment")
          ?.type as "sprint" | "climb") ?? "regular"
      : "regular";

    curLatLng.push(latlng);
    if (prevType !== type) {
      if (prevType !== undefined) {
        sections.push({
          latlng: curLatLng,
          type: prevType,
        });
      }

      prevType = type;
      curLatLng = [latlng];
    }
  }

  if (prevType !== undefined) {
    sections.push({
      latlng: curLatLng,
      type: prevType,
    });
  }

  return sections;
}

async function loadSegments(segmentsToLoad: readonly string[]) {
  try {
    const segmentsOnRoute = segmentsToLoad
      .map((segmentSlug) => segments.find((s) => s.slug === segmentSlug)!)
      .filter((s) => s.stravaSegmentId !== undefined);

    const streams = await Promise.all(
      segmentsOnRoute.map((s) =>
        getStravaSegmentStream(s.slug, "segments", "latlng")
      )
    );

    return streams.map((stream, streamIndex) => ({
      latlng: stream,
      type: segmentsOnRoute[streamIndex].type,
    }));
  } catch (e) {
    Sentry.captureException(e);
  }
}
