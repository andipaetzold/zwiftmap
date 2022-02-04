import { TextField } from "@react-md/form";
import { SimpleListItem } from "@react-md/list";
import { LocationOnSVGIcon } from "@react-md/material-icons";
import { LatLngTuple } from "leaflet";
import { LocationStateRouting } from "../../../../services/location-state";
import styles from "./RoutingWaypoints.module.scss";

interface Props {
  state: LocationStateRouting;
}

export function RoutingWaypoints({ state }: Props) {
  return (
    <>
      {[0, 1].map((index) => (
        <SimpleListItem key={index}>
          <TextField
            id="routing-waypoints-2"
            readOnly
            dense
            className={styles.TextField}
            value={
              state.points[index]
                ? formatPoint(state.points[index])
                : "Select point on map"
            }
            leftChildren={<LocationOnSVGIcon />}
          />
        </SimpleListItem>
      ))}
    </>
  );
}

const FORMAT = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 6,
  maximumFractionDigits: 6,
});

function formatPoint(point: LatLngTuple): string {
  return point.map((p) => FORMAT.format(p)).join(" / ");
}
