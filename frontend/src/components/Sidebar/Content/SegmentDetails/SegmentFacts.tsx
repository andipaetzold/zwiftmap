import { SimpleListItem } from "@react-md/list";
import {
  LandscapeSVGIcon,
  MapSVGIcon,
  SpaceBarSVGIcon,
} from "@react-md/material-icons";
import { Segment } from "zwift-data";
import { WORLDS_BY_SLUG } from "../../../../constants";
import { Distance } from "../../../Distance";
import { Elevation } from "../../../Elevation";

interface Props {
  segment: Segment;
}

export function SegmentFacts({ segment }: Props) {
  const world = WORLDS_BY_SLUG[segment.world];

  return (
    <>
      <SimpleListItem
        clickable={false}
        leftAddon={<SpaceBarSVGIcon />}
        leftAddonType="icon"
      >
        <Distance distance={segment.distance} />
      </SimpleListItem>

      {segment.elevation && (
        <SimpleListItem
          clickable={false}
          leftAddon={<LandscapeSVGIcon />}
          leftAddonType="icon"
        >
          <Elevation elevation={segment.elevation} />
        </SimpleListItem>
      )}

      <SimpleListItem clickable={false} leftAddon={<MapSVGIcon />}>
        {world.name}
      </SimpleListItem>
    </>
  );
}
