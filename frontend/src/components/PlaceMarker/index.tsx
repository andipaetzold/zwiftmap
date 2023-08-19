import { Icon } from "leaflet";
import { useMemo } from "react";
import { Marker, MarkerProps } from "react-leaflet";
import { getMarkerIconAsDataUrl } from "../MarkerIcon";
import shadowUrl from "./marker-shadow.png";

export interface PlaceMarkerProps extends Omit<MarkerProps, "icon"> {
  label?: string;
  fill?: string;
}

export function PlaceMarker(props: PlaceMarkerProps) {
  const icon = useMemo(
    () =>
      new Icon({
        iconUrl: getMarkerIconAsDataUrl({
          fill: props.fill,
          label: props.label,
        }),
        iconRetinaUrl: undefined,
        shadowUrl,
        iconSize: [26.5, 41],
        iconAnchor: [26.5 / 2, 41],
        shadowSize: [41, 41],
      }),
    [props.fill, props.label],
  );
  return <Marker {...props} icon={icon} />;
}
