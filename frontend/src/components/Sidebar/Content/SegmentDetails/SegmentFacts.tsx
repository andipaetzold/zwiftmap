import { SimpleListItem } from "@react-md/list";
import {
  LandscapeSVGIcon,
  MapSVGIcon,
  SpaceBarSVGIcon,
} from "@react-md/material-icons";
import { Segment, worlds } from "zwift-data";
import { Distance } from "../../../Distance";
import { Elevation } from "../../../Elevation";

interface Props {
  segment: Segment;
}

export function SegmentFacts({ segment }: Props) {
  const world = worlds.find((w) => w.slug === segment.world)!;

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
