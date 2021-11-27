import { SimpleListItem } from "@react-md/list";
import {
  LandscapeFontIcon,
  MapFontIcon,
  SpaceBarFontIcon,
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
        leftAddon={<SpaceBarFontIcon />}
        leftAddonType="icon"
      >
        <Distance distance={segment.distance} />
      </SimpleListItem>

      {segment.elevation && (
        <SimpleListItem
          clickable={false}
          leftAddon={<LandscapeFontIcon />}
          leftAddonType="icon"
        >
          <Elevation elevation={segment.elevation} />
        </SimpleListItem>
      )}

      <SimpleListItem clickable={false} leftAddon={<MapFontIcon />}>
        {world.name}
      </SimpleListItem>
    </>
  );
}
