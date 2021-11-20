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
  const world = getWorld(share.activity.start_latlng as [number, number]);

  return (
    <>
      <SimpleListItem
        clickable={false}
        leftAddon={<TimerFontIcon />}
        leftAddonType="icon"
      >
        <Time seconds={share.activity.moving_time} />
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
        <Elevation elevation={share.activity.total_elevation_gain} />
      </SimpleListItem>
      {world && (
        <SimpleListItem clickable={false} leftAddon={<MapFontIcon />}>
          {world.name}
        </SimpleListItem>
      )}
    </>
  );
}
