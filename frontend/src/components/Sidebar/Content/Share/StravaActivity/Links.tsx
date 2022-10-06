import { ListItemLink, ListItemText, ListSubheader } from "@react-md/list";
import { OpenInNewSVGIcon } from "@react-md/material-icons";
import { ShareStravaActivity } from "../../../../../types";
import { StravaAvatar } from "../../../../Avatar";

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
          <div>
            <StravaAvatar />
          </div>
        }
        leftAddonType="avatar"
        rightAddon={<OpenInNewSVGIcon />}
        rightAddonType="icon"
      >
        <ListItemText>Activity on Strava</ListItemText>
      </ListItemLink>
      <ListItemLink
        href={`https://www.strava.com/athletes/${share.athlete.id}`}
        target="_blank"
        leftAddon={
          <div>
            <StravaAvatar />
          </div>
        }
        leftAddonType="avatar"
        rightAddon={<OpenInNewSVGIcon />}
        rightAddonType="icon"
      >
        <ListItemText>Athlete on Strava</ListItemText>
      </ListItemLink>
    </>
  );
}
