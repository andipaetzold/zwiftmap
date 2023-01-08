import { HoverStatePreviewLatLngStream } from "../../../types";
import { PreviewRoutePane } from "./PreviewRoutePane";

interface Props {
  state: HoverStatePreviewLatLngStream;
}

export function LatLngStreamPreview({ state }: Props) {
  return <PreviewRoutePane stream={state.latLngStream} />;
}
