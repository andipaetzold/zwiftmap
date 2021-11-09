import { Avatar } from "@react-md/avatar";
import { ListItemLink, ListItemText, ListSubheader } from "@react-md/list";
import { OpenInNewFontIcon } from "@react-md/material-icons";
import { StravaActivity } from "../../../../services/StravaActivityRepository";
import stravaLogo from "../../../../assets/strava-40x40.png";

export interface Props {
  activity: StravaActivity;
}

export function StravaActivityLinks({ activity }: Props) {
  return (
    <>
      {" "}
      <ListSubheader>Links</ListSubheader>
      <ListItemLink
        href={`https://www.strava.com/activities/${activity.id}`}
        target="_blank"
        leftAddon={
          <Avatar>
            <img src={stravaLogo} alt="" />
          </Avatar>
        }
        leftAddonType="avatar"
        rightAddon={<OpenInNewFontIcon />}
        rightAddonType="icon"
      >
        <ListItemText>Activity on Strava</ListItemText>
      </ListItemLink>
      <ListItemLink
        href={`https://www.strava.com/athletes/${activity.athleteId}`}
        target="_blank"
        leftAddon={
          <Avatar>
            <img src={stravaLogo} alt="" />
          </Avatar>
        }
        leftAddonType="avatar"
        rightAddon={<OpenInNewFontIcon />}
        rightAddonType="icon"
      >
        <ListItemText>Athlete on Strava</ListItemText>
      </ListItemLink>
    </>
  );
}
