import { Button } from "@react-md/button";
import { TextField } from "@react-md/form";
import { TextIconSpacing } from "@react-md/icon";
import { SimpleListItem } from "@react-md/list";
import { AddSVGIcon, ClearSVGIcon } from "@react-md/material-icons";
import { LatLngTuple } from "leaflet";
import {
  LocationStateRouting,
  navigate,
} from "../../../../services/location-state";
import { MarkerIcon } from "../../../MarkerIcon";
import styles from "./RoutingWaypoints.module.scss";

interface Props {
  state: LocationStateRouting;
}

export function RoutingWaypoints({ state }: Props) {
  return (
    <>
      {state.points.map((point, index) => (
        <SimpleListItem key={index}>
          <TextField
            id="routing-waypoints-2"
            readOnly
            dense
            className={styles.TextField}
            value={point ? formatPoint(point) : ""}
            placeholder="Select point on map"
            leftChildren={<MarkerIcon number={index + 1} />}
            isRightAddon={false}
            rightChildren={
              point && (
                <Button
                  buttonType="icon"
                  style={{ right: 0, position: "absolute" }}
                  onClick={() => {
                    if (state.points.length > 2) {
                      navigate({
                        ...state,
                        points: state.points.filter((_, i) => i !== index),
                      });
                    } else {
                      navigate({
                        ...state,
                        points: state.points.map((p, i) =>
                          i === index ? null : p
                        ),
                      });
                    }
                  }}
                  aria-label="Clear search field"
                >
                  <ClearSVGIcon />
                </Button>
              )
            }
          />
        </SimpleListItem>
      ))}
      {state.points.filter((p) => p !== null).length >= 2 &&
        state.points[state.points.length - 1] && (
          <SimpleListItem>
            <Button
              themeType="outline"
              onClick={() =>
                navigate({
                  ...state,
                  points: [...state.points, null],
                })
              }
            >
              <TextIconSpacing icon={<AddSVGIcon />}>
                Add waypoint
              </TextIconSpacing>
            </Button>
          </SimpleListItem>
        )}
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
