import { lazy, Suspense } from "react";
import { Route, Segment } from "zwift-data";

const RouteComponent = lazy(() => import("./RouteElevationChartPreview"));

interface RouteProps {
  route: Route;
}

export function RouteElevationChartPreview(props: RouteProps) {
  return (
    <Suspense fallback={null}>
      <RouteComponent {...props} />
    </Suspense>
  );
}

const SegmentComponent = lazy(() => import("./SegmentElevationChartPreview"));

interface SegmentProps {
  segment: Segment;
}

export function SegmentElevationChartPreview(props: SegmentProps) {
  return (
    <Suspense fallback={null}>
      <SegmentComponent {...props} />
    </Suspense>
  );
}
