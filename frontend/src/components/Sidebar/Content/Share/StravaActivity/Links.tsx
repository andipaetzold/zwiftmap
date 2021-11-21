import { Avatar } from "@react-md/avatar";
import { ListItemLink, ListItemText, ListSubheader } from "@react-md/list";
import { OpenInNewFontIcon } from "@react-md/material-icons";
import stravaLogo from "../../../../../assets/strava-40x40.png";
import { ShareStravaActivity } from "../../../../../types";

export interface Props {
  share: ShareStravaActivity;
}

export function SharedStravaActivityLinks({ share }: Props) {
  return (
    <>
      <ListSubheader>Links</ListSubheader>
      <ListItemLink
        href={`https://www.strava.com/activities/${share.activity.id}`}
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
        href={`https://www.strava.com/athletes/${share.athlete.id}`}
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
