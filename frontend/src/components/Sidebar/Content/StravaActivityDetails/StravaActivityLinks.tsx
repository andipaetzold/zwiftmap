import { ListItemLink, ListItemText, ListSubheader } from "@react-md/list";
import { OpenInNewSVGIcon } from "@react-md/material-icons";
import { StravaActivity } from "../../../../services/StravaActivityRepository";
import { StravaAvatar } from "../../../Avatar";

interface Props {
  activity: StravaActivity;
}

export function StravaActivityLinks({ activity }: Props) {
  return (
    <>
      <ListSubheader>Links</ListSubheader>
      <ListItemLink
        href={`https://www.strava.com/activities/${activity.id}`}
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
        href={`https://www.strava.com/athletes/${activity.athleteId}`}
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
