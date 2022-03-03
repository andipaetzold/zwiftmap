import { lazy, Suspense } from "react";
import { Route } from "zwift-data";
import { LocationState } from "../../../../services/location-state";
import { LoadingSpinnerListItem } from "../../../Loading";

const Component = lazy(() => import("./component"));

interface Props {
  route: Route;
  backButtonText: string;
  backButtonState: LocationState;
}
export function RouteDetails(props: Props) {
  return (
    <Suspense fallback={<LoadingSpinnerListItem />}>
      <Component {...props} />
    </Suspense>
  );
}
