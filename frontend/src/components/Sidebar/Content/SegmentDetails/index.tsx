import { lazy, Suspense } from "react";
import { Segment } from "zwift-data";
import { LocationState } from "../../../../services/location-state";
import { LoadingSpinnerListItem } from "../../../Loading";

const Component = lazy(() => import("./component"));

interface Props {
  segment: Segment;
  backButtonText: string;
  backButtonState: LocationState;
}

export function SegmentDetails(props: Props) {
  return (
    <Suspense fallback={<LoadingSpinnerListItem />}>
      <Component {...props} />
    </Suspense>
  );
}
