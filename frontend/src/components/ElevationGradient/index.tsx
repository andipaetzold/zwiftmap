import { COLORS } from "../../constants";

export function ElevationGradient() {
  return (
    <>
      <linearGradient id="colorElevation" x1="0" y1="0" x2="0" y2="100%">
        <stop offset="5%" stopColor={COLORS.regular} stopOpacity={0.8} />
        <stop offset="95%" stopColor={COLORS.regular} stopOpacity={0} />
      </linearGradient>
      <linearGradient id="colorSegmentSprint" x1="0" y1="0" x2="0" y2="100%">
        <stop offset="5%" stopColor={COLORS.sprintSegment} stopOpacity={0.8} />
        <stop offset="95%" stopColor={COLORS.sprintSegment} stopOpacity={0} />
      </linearGradient>
      <linearGradient id="colorSegmentKOM" x1="0" y1="0" x2="0" y2="100%">
        <stop offset="5%" stopColor={COLORS.komSegment} stopOpacity={0.8} />
        <stop offset="95%" stopColor={COLORS.komSegment} stopOpacity={0} />
      </linearGradient>
    </>
  );
}
