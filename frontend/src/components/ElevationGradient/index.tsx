import { Fragment } from "react";

export function ElevationGradient() {
  return (
    <>
      <linearGradient id="colorElevation" x1="0" y1="0" x2="0" y2="100%">
        <stop offset="5%" stopColor="black" stopOpacity={0.8} />
        <stop offset="95%" stopColor="black" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="colorSegment" x1="0" y1="0" x2="0" y2="100%">
        <stop offset="5%" stopColor="#64ac39" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#64ac39" stopOpacity={0} />
      </linearGradient>
    </>
  );
}
