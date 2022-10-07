import { SimpleListItem } from "@react-md/list";
import {
  LandscapeSVGIcon,
  MapSVGIcon,
  SpaceBarSVGIcon,
  TimerSVGIcon,
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
      <SimpleListItem leftAddon={<TimerSVGIcon />} leftAddonType="icon">
        <Time seconds={share.activity.moving_time} />
      </SimpleListItem>
      <SimpleListItem leftAddon={<SpaceBarSVGIcon />} leftAddonType="icon">
        <Distance distance={share.activity.distance / 1_000} />
      </SimpleListItem>
      <SimpleListItem leftAddon={<LandscapeSVGIcon />} leftAddonType="icon">
        <Elevation elevation={share.activity.total_elevation_gain} />
      </SimpleListItem>
      {world && (
        <SimpleListItem leftAddon={<MapSVGIcon />}>{world.name}</SimpleListItem>
      )}
    </>
  );
}
