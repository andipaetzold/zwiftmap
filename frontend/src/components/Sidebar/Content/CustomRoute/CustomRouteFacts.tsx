import { SimpleListItem } from "@react-md/list";
import { LandscapeSVGIcon, SpaceBarSVGIcon } from "@react-md/material-icons";
import { lineString } from "@turf/helpers";
import turfLength from "@turf/length";
import { useMemo } from "react";
import { LatLngAlt } from "../../../../types";
import { Distance } from "../../../Distance";
import { Elevation } from "../../../Elevation";

interface Props {
  stream: LatLngAlt[];
}

export function CustomRouteFacts({ stream }: Props) {
  const distance = useMemo(() => turfLength(lineString(stream)), [stream]);
  const elevation = useMemo(
    () =>
      stream
        .map(([, , alt], index, array) => {
          const prev = array[index - 1];
          if (prev === undefined) {
            return 0;
          }
          const [, , prevAlt] = prev;
          if (prevAlt >= alt) {
            return 0;
          }
          return alt - prevAlt;
        })
        .reduce((prev, cur) => prev + cur, 0),
    [stream],
  );

  return (
    <>
      <SimpleListItem leftAddon={<SpaceBarSVGIcon />} leftAddonType="icon">
        <Distance distance={distance} />
      </SimpleListItem>

      <SimpleListItem leftAddon={<LandscapeSVGIcon />} leftAddonType="icon">
        <Elevation elevation={elevation} />
      </SimpleListItem>
    </>
  );
}
