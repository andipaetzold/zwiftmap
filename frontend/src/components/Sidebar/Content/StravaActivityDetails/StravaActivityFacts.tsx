import { SimpleListItem } from "@react-md/list";
import {
  LandscapeFontIcon,
  MapFontIcon,
  SpaceBarFontIcon,
  ThumbUpFontIcon,
  TimerFontIcon,
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
        leftAddon={<TimerFontIcon />}
        leftAddonType="icon"
      >
        <Time seconds={activity.time} />
      </SimpleListItem>
      <SimpleListItem
        clickable={false}
        leftAddon={<SpaceBarFontIcon />}
        leftAddonType="icon"
      >
        <Distance distance={activity.distance} />
      </SimpleListItem>
      <SimpleListItem
        clickable={false}
        leftAddon={<LandscapeFontIcon />}
        leftAddonType="icon"
      >
        <Elevation elevation={activity.elevation} />
      </SimpleListItem>
      <SimpleListItem clickable={false} leftAddon={<MapFontIcon />}>
        {activity.world.name}
      </SimpleListItem>

      {activity.kudos > 0 && (
        <SimpleListItem clickable={false} leftAddon={<ThumbUpFontIcon />}>
          {activity.kudos}
        </SimpleListItem>
      )}
    </>
  );
}
