import { lazy, Suspense } from "react";
import { LocationState } from "../../../../services/location-state";
import { LoadingSpinnerListItem } from "../../../Loading";

const Component = lazy(() => import("./component"));

interface Props {
  shareId: string;
  backButtonState: LocationState;
  backButtonText: string;
}

export function Share(props: Props) {
  return (
    <Suspense fallback={<LoadingSpinnerListItem />}>
      <Component {...props} />
    </Suspense>
  );
}
