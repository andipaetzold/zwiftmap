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
      <SimpleListItem
        clickable={false}
        leftAddon={<TimerSVGIcon />}
        leftAddonType="icon"
      >
        <Time seconds={activity.time} />
      </SimpleListItem>
      <SimpleListItem
        clickable={false}
        leftAddon={<SpaceBarSVGIcon />}
        leftAddonType="icon"
      >
        <Distance distance={activity.distance} />
      </SimpleListItem>
      <SimpleListItem
        clickable={false}
        leftAddon={<LandscapeSVGIcon />}
        leftAddonType="icon"
      >
        <Elevation elevation={activity.elevation} />
      </SimpleListItem>
      <SimpleListItem clickable={false} leftAddon={<MapSVGIcon />}>
        {activity.world.name}
      </SimpleListItem>

      {activity.kudos > 0 && (
        <SimpleListItem clickable={false} leftAddon={<ThumbUpSVGIcon />}>
          {activity.kudos}
        </SimpleListItem>
      )}
    </>
  );
}
