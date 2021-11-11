import { SimpleListItem } from "@react-md/list";
import {
  LandscapeFontIcon,
  MapFontIcon,
  SpaceBarFontIcon,
  TimerFontIcon,
} from "@react-md/material-icons";
import { ShareStravaActivity } from "../../../../../types";
import { getWorld } from "../../../../../util/strava";
import { Distance } from "../../../../Distance";
import { Elevation } from "../../../../Elevation";
import { Time } from "../../../../Time";

interface Props {
  share: ShareStravaActivity;
}

export function SharedStravaActivityFacts({ share }: Props) {
  const world = getWorld(share.activity.latlng);

  return (
    <>
      <SimpleListItem
        clickable={false}
        leftAddon={<TimerFontIcon />}
        leftAddonType="icon"
      >
        <Time seconds={share.activity.time} />
      </SimpleListItem>
      <SimpleListItem
        clickable={false}
        leftAddon={<SpaceBarFontIcon />}
        leftAddonType="icon"
      >
        <Distance distance={share.activity.distance} />
      </SimpleListItem>
      <SimpleListItem
        clickable={false}
        leftAddon={<LandscapeFontIcon />}
        leftAddonType="icon"
      >
        <Elevation elevation={share.activity.elevation} />
      </SimpleListItem>
      {world && (
        <SimpleListItem clickable={false} leftAddon={<MapFontIcon />}>
          {world.name}
        </SimpleListItem>
      )}
    </>
  );
}
