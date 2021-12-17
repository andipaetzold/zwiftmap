import { LatLngTuple } from "leaflet";
import { Pane, Polyline } from "react-leaflet";
import { COLORS } from "../../constants";
import { Z_INDEX } from "./constants";

interface Props {
  latLngStream?: LatLngTuple[];
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
