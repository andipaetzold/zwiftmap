import { Pane, Polyline } from "react-leaflet";
import { COLORS } from "../../constants";
import { LatLngStream } from "../../types";
import { Z_INDEX } from "./constants";

interface Props {
  latLngStream?: LatLngStream;
}

export function PreviewRoute({ latLngStream }: Props) {
  if (!latLngStream) {
    return null;
  }

  return (
    <Pane name="preview-route" style={{ zIndex: Z_INDEX.previewRoute }}>
      <Polyline
        positions={latLngStream}
        pathOptions={{ color: COLORS.previewRoute, weight: 5 }}
        interactive={false}
      />
    </Pane>
  );
}
