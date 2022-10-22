import { ListItem, ListSubheader } from "@react-md/list";
import { InsertDriveFileSVGIcon } from "@react-md/material-icons";
import { saveAs } from "file-saver";
import { LatLngTuple } from "leaflet";
import { createGPX } from "../../../../services/gpx";
import {
  createUrl,
  LocationStateCustomRoute,
} from "../../../../services/location-state";
import { LatLngAlt } from "../../../../types";
import { getCustomRouteImageUrl } from "../../../../util/image";
import { ShareImageListItem } from "../../../ShareImageListItem";

interface Props {
  state: LocationStateCustomRoute;
  latLngStream: LatLngAlt[];
}

export function CustomRouteSharing({ state, latLngStream }: Props) {
  const url = state.points.every((p) => p !== null)
    ? getCustomRouteImageUrl(state.points as LatLngTuple[])
    : undefined;

  return (
    <>
      <ListSubheader>Sharing</ListSubheader>
      {url && <ShareImageListItem url={url} filename="custom-route.png" />}
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
      rightAddonType="icon"
      rightAddon={<InsertDriveFileSVGIcon />}
    >
      Export as GPX
    </ListItem>
  );
}
