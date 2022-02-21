import { XMLBuilder } from "fast-xml-parser";
import { LatLngAlt } from "../types";

const builder = new XMLBuilder({
  ignoreAttributes: false,
  format: true,
  suppressEmptyNode: true,
});

export function createGPX(url: string, stream: LatLngAlt[]): string {
  const content = builder.build({
    gpx: {
      "@_creator": "ZwiftMap",
      "@_xmlns": "http://www.topografix.com/GPX/1/1",
      "@_xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "@_xsi:schemaLocation":
        "http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd",
      "@_version": "1.1",
      metadata: {
        name: "Custom Route",
        desc: "Custom Route on Zwift",
        author: {
          name: "ZwiftMap",
        },
        link: {
          "@_href": url,
        },
      },
      trk: {
        name: "Custom Route",
        link: {
          "@_href": url,
        },
        type: "Ride",
        trkseg: stream.map(([lat, lng, alt]) => ({
          trkpt: {
            "@_lat": lat,
            "@_lon": lng,
            ele: alt,
          },
        })),
      },
    },
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n${content}`;
}
