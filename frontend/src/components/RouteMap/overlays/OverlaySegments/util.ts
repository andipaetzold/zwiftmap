import { segments } from "zwift-data";
import { DistanceStream, LatLngStream } from "../../../../types";
import { Section } from "./types";

export function getRouteSections(
  streams: {
    latlng: LatLngStream;
    distance: DistanceStream;
  },
  segmentsOnRoute: ReadonlyArray<{
    from: number;
    to: number;
    segment: string;
  }>,
) {
  const sections: Section[] = [];

  const indexCount = streams.latlng.length;

  let prevType: "regular" | "sprint" | "climb" | undefined = undefined;
  let curLatLng: LatLngStream = [];
  for (let i = 0; i < indexCount; ++i) {
    const distance = streams.distance[i];
    const latlng = streams.latlng[i];

    const segmentSlug = segmentsOnRoute.find(
      (sor) => sor.from * 1_000 < distance && sor.to * 1_000 >= distance,
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
