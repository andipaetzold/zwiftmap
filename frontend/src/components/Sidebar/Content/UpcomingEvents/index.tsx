import { lazy, Suspense } from "react";
import { LocationStateUpcomingEvents } from "../../../../services/location-state";
import { LoadingSpinnerListItem } from "../../../Loading";

const Component = lazy(() => import("./component"));

interface Props {
  state: LocationStateUpcomingEvents;
}

export function UpcomingEvents(props: Props) {
  return (
    <Suspense fallback={<LoadingSpinnerListItem />}>
      <Component {...props} />
    </Suspense>
  );
}
