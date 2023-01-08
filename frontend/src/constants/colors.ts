import { SegmentType } from "zwift-data";

export const COLORS = {
  regular: "var(--rmd-theme-text-primary-on-background)",
  sprintSegment: "#56A845",
  komSegment: "#ed2324",
  lapSegment: "#fc6719",
  previewRoute: "#D3D3D3",
  route: "#fc6719",
  place: "#fc6719",
} satisfies Record<string, string>;

export function getSegmentColor(type: SegmentType) {
  switch (type) {
    case "climb":
      return COLORS.komSegment;
    case "sprint":
      return COLORS.sprintSegment;
    case "segment":
      return COLORS.lapSegment;
  }
}
