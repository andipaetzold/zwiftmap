import { lazy, Suspense } from "react";
import { LocationStatePlaceNew } from "../../../../services/location-state";
import { LoadingSpinnerListItem } from "../../../Loading";

const Component = lazy(() => import("./component"));

interface Props {
  state: LocationStatePlaceNew;
}

export function PlaceNew(props: Props) {
  return (
    <Suspense fallback={<LoadingSpinnerListItem />}>
      <Component {...props} />
    </Suspense>
  );
}
