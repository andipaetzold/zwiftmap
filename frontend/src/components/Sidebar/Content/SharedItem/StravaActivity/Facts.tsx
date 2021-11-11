import { SimpleListItem } from "@react-md/list";
import {
  LandscapeFontIcon,
  MapFontIcon,
  SpaceBarFontIcon,
  TimerFontIcon,
} from "@react-md/material-icons";
import { SharedItemStravaActivity } from "../../../../../types";
import { getWorld } from "../../../../../util/strava";
import { Distance } from "../../../../Distance";
import { Elevation } from "../../../../Elevation";
import { Time } from "../../../../Time";

interface Props {
  sharedItem: SharedItemStravaActivity;
}

export function SharedStravaActivityFacts({ sharedItem }: Props) {
  const world = getWorld(sharedItem.activity.latlng);

  return (
    <>
      <SimpleListItem
        clickable={false}
        leftAddon={<TimerFontIcon />}
        leftAddonType="icon"
      >
        <Time seconds={sharedItem.activity.time} />
      </SimpleListItem>
      <SimpleListItem
        clickable={false}
        leftAddon={<SpaceBarFontIcon />}
        leftAddonType="icon"
      >
        <Distance distance={sharedItem.activity.distance} />
      </SimpleListItem>
      <SimpleListItem
        clickable={false}
        leftAddon={<LandscapeFontIcon />}
        leftAddonType="icon"
      >
        <Elevation elevation={sharedItem.activity.elevation} />
      </SimpleListItem>
      {world && (
        <SimpleListItem clickable={false} leftAddon={<MapFontIcon />}>
          {world.name}
        </SimpleListItem>
      )}
    </>
  );
}
