import { ListSubheader, SimpleListItem } from "@react-md/list";
import {
  AccessibilityFontIcon,
  DirectionsBikeFontIcon,
} from "@react-md/material-icons";
import { bikeFrames, jerseys } from "zwift-data";
import { ZwiftEvent } from "../../../../services/events";

interface Props {
  event: ZwiftEvent;
}

export function EventKit({ event }: Props) {
  const jersey = jerseys.find((j) => event.jerseyHash === j.id);
  const bikeFrame = bikeFrames.find((bf) => bf.id === event.bikeHash);

  if (jersey === undefined && bikeFrame === undefined) {
    return null;
  }

  return (
    <>
      <ListSubheader>Kit</ListSubheader>

      {jersey && (
        <SimpleListItem
          clickable={false}
          leftAddon={<AccessibilityFontIcon />}
          leftAddonType="icon"
        >
          {jersey.name}
        </SimpleListItem>
      )}
      {bikeFrame && (
        <SimpleListItem
          clickable={false}
          leftAddon={<DirectionsBikeFontIcon />}
          leftAddonType="icon"
        >
          {bikeFrame.name}
        </SimpleListItem>
      )}
    </>
  );
}
