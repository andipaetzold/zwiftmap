import { ListItem, ListSubheader } from "@react-md/list";
import { FileDownloadSVGIcon } from "@react-md/material-icons";
import { saveAs } from "file-saver";
import { createGPX } from "../../../../services/gpx";
import {
  createUrl,
  LocationStateCustomRoute,
} from "../../../../services/location-state";
import { LatLngAlt } from "../../../../types";

interface Props {
  state: LocationStateCustomRoute;
  latLngStream: LatLngAlt[];
}

export function CustomRouteExport({ state, latLngStream }: Props) {
  return (
    <>
      <ListSubheader>Sharing</ListSubheader>
      <Export state={state} latLngStream={latLngStream} />
    </>
  );
}

function Export({ state, latLngStream }: Props) {
  const onClick = () => {
    const url = `${window.origin}${createUrl(state)}`;
    const xml = createGPX(url, latLngStream);
    const blob = new Blob([xml], { type: "application/gpx+xml" });
    saveAs(blob, "custom-route.gpx");
  };

  return (
    <ListItem
      onClick={onClick}
      rightAddon={<FileDownloadSVGIcon />}
      rightAddonType="icon"
    >
      Export as GPX
    </ListItem>
  );
}
