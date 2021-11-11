import { Avatar } from "@react-md/avatar";
import { ListItemLink, ListItemText, ListSubheader } from "@react-md/list";
import { OpenInNewFontIcon } from "@react-md/material-icons";
import { SharedItemStravaActivity } from "../../../../../types";
import stravaLogo from "../../../../../assets/strava-40x40.png";

export interface Props {
  sharedItem: SharedItemStravaActivity;
}

export function SharedStravaActivityLinks({ sharedItem }: Props) {
  return (
    <>
      <ListSubheader>Links</ListSubheader>
      <ListItemLink
        href={`https://www.strava.com/activities/${sharedItem.activity.id}`}
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
        href={`https://www.strava.com/athletes/${sharedItem.activity.athleteId}`}
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
