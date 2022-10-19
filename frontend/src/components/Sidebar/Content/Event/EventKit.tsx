import { ListSubheader, SimpleListItem } from "@react-md/list";
import {
  AccessibilitySVGIcon,
  DirectionsBikeSVGIcon,
} from "@react-md/material-icons";
import { bikeFrames, jerseys } from "zwift-data";
import { EventSubgroup } from "../../../../types";

interface Props {
  subgroup: EventSubgroup;
}

export function EventKit({ subgroup }: Props) {
  const jersey = jerseys.find((j) => subgroup.jerseyHash === j.id);
  const bikeFrame = bikeFrames.find((bf) => bf.id === subgroup.bikeHash);

  if (jersey === undefined && bikeFrame === undefined) {
    return null;
  }

  return (
    <>
      <ListSubheader>Kit</ListSubheader>

      {jersey && (
        <SimpleListItem
          leftAddon={<AccessibilitySVGIcon />}
          leftAddonType="icon"
        >
          {jersey.name}
        </SimpleListItem>
      )}
      {bikeFrame && (
        <SimpleListItem
          leftAddon={<DirectionsBikeSVGIcon />}
          leftAddonType="icon"
        >
          {bikeFrame.name}
        </SimpleListItem>
      )}
    </>
  );
}
