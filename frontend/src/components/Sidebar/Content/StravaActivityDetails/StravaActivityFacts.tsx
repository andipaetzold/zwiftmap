import { SimpleListItem } from "@react-md/list";
import {
  LandscapeSVGIcon,
  MapSVGIcon,
  SpaceBarSVGIcon,
  ThumbUpSVGIcon,
  TimerSVGIcon,
} from "@react-md/material-icons";
import { StravaActivity } from "../../../../services/StravaActivityRepository";
import { Distance } from "../../../Distance";
import { Elevation } from "../../../Elevation";
import { Time } from "../../../Time";

interface Props {
  activity: StravaActivity;
}

export function StravaActivityFacts({ activity }: Props) {
  return (
    <>
      <SimpleListItem leftAddon={<TimerSVGIcon />} leftAddonType="icon">
        <Time seconds={activity.time} />
      </SimpleListItem>
      <SimpleListItem leftAddon={<SpaceBarSVGIcon />} leftAddonType="icon">
        <Distance distance={activity.distance} />
      </SimpleListItem>
      <SimpleListItem leftAddon={<LandscapeSVGIcon />} leftAddonType="icon">
        <Elevation elevation={activity.elevation} />
      </SimpleListItem>
      <SimpleListItem leftAddon={<MapSVGIcon />}>
        {activity.world.name}
      </SimpleListItem>

      {activity.kudos > 0 && (
        <SimpleListItem leftAddon={<ThumbUpSVGIcon />}>
          {activity.kudos}
        </SimpleListItem>
      )}
    </>
  );
}
