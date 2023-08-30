import { lazy, Suspense } from "react";
import { World } from "zwift-data";
import { useAuthStatus } from "../../../../react-query";
import { LoadingSpinnerListItem } from "../../../Loading";

const Component = lazy(() =>
  import("./component").then((m) => ({ default: m.OverlayHeatmapComponent })),
);

interface Props {
  world: World;
}

export function OverlayHeatmap(props: Props) {
  const { data: status } = useAuthStatus();
  if (!status?.betaUser) {
    return null;
  }

  return (
    <Suspense fallback={<LoadingSpinnerListItem />}>
      <Component {...props} />
    </Suspense>
  );
}
