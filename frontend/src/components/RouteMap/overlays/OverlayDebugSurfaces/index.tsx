import { lazy, Suspense } from "react";
import { World } from "zwift-data";
import { ENVIRONMENT } from "../../../../config";
import { LoadingSpinnerListItem } from "../../../Loading";

const Component = lazy(() =>
  import("./component").then((m) => ({
    default: m.OverlayDebugSurfacesComponent,
  }))
);

interface Props {
  world: World;
}

export function OverlayDebugSurfaces(props: Props) {
  if (ENVIRONMENT === "production") {
    return null;
  }

  return (
    <Suspense fallback={<LoadingSpinnerListItem />}>
      <Component {...props} />
    </Suspense>
  );
}
