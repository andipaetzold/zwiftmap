import { lazy, Suspense } from "react";
import { LocationStateCustomRoute } from "../../../../services/location-state";
import { LoadingSpinnerListItem } from "../../../Loading";

const Component = lazy(() => import("./component"));

interface Props {
  state: LocationStateCustomRoute;
}

export function CustomRoute(props: Props) {
  return (
    <Suspense fallback={<LoadingSpinnerListItem />}>
      <Component {...props} />
    </Suspense>
  );
}
