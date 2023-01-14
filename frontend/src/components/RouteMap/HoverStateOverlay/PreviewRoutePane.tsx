import { Pane, Polyline } from "react-leaflet";
import { COLORS } from "../../../constants";
import { LatLngStream } from "../../../types";
import { Z_INDEX } from "../constants";

interface Props {
  stream: LatLngStream | undefined;
}

export function PreviewRoutePane({ stream }: Props) {
  if (!stream) {
    return null;
  }

  return (
    <Pane name="preview-route" style={{ zIndex: Z_INDEX.previewRoute }}>
      <Polyline
        positions={stream}
        pathOptions={{ color: COLORS.previewRoute, weight: 5 }}
        interactive={false}
      />
    </Pane>
  );
}
