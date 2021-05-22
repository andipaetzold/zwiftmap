import { Avatar } from "@react-md/avatar";
import { ListItem } from "@react-md/list";
import { OpenInNewFontIcon } from "@react-md/material-icons";
import React from "react";
import stravaLogo from "../../assets/strava-40x40.png";
import { useStravaToken } from "../../hooks/useStravaToken";
import { STRAVA_AUTH_URL } from "../../services/strava";

export interface Props {
  activity: { activityId: number; slug: string };
  onClick: () => void;
  onHoverRoute: (route?: string) => void;
}

export function SearchResultCardStravaActivity({
  activity,
  onClick,
  onHoverRoute,
}: Props) {
  const [stravaToken] = useStravaToken();

  if (stravaToken === null) {
    return (
      <ListItem
        leftAddon={
          <Avatar color="#ff6b00">
            <img src={stravaLogo} alt="" />
          </Avatar>
        }
        leftAddonType="avatar"
        rightAddon={<OpenInNewFontIcon />}
        rightAddonType="icon"
        secondaryText="…to view Strava activity"
        onClick={() => window.open(STRAVA_AUTH_URL, "_blank")}
      >
        Authorize Strava App…
      </ListItem>
    );
  }

  return <>TODO</>;
}
