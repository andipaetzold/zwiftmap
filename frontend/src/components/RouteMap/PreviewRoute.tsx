import { useAsync } from "react-async-hook";
import { Pane, Polyline } from "react-leaflet";
import { COLORS } from "../../constants";
import { useStore } from "../../hooks/useStore";
import { Z_INDEX } from "./constants";
import { loadPreviewRoute } from "./loaders/previewRoute";

export function PreviewRoute() {
  const hoverState = useStore((store) => store.hoverState);
  const { result: latLngStream } = useAsync(loadPreviewRoute, [hoverState]);

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
