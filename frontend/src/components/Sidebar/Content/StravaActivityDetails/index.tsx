import { Avatar } from "@react-md/avatar";
import {
  List,
  ListItemLink,
  ListItemText,
  SimpleListItem,
} from "@react-md/list";
import { OpenInNewFontIcon } from "@react-md/material-icons";
import { CircularProgress } from "@react-md/progress";
import React from "react";
import { useAsync } from "react-async-hook";
import stravaLogo from "../../../../assets/strava-40x40.png";
import { useIsLoggedInStrava } from "../../../../hooks/useIsLoggedInStrava";
import { useStravaAuthUrl } from "../../../../services/strava/auth";
import { getStravaActivity } from "../../../../services/StravaActivityRepository";
import { StravaActivityDetailsComponent } from "./component";

interface Props {
  activityId: number;
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
}

export function StravaActivityDetails({
  activityId,
  onMouseHoverDistanceChange,
}: Props) {
  const isLoggedInStrava = useIsLoggedInStrava();
  const stravaAuthUrl = useStravaAuthUrl();
  const { result: activity, loading } = useAsync(getStravaActivity, [
    activityId,
  ]);

  if (!isLoggedInStrava) {
    return (
      <List>
        <ListItemLink
          leftAddon={
            <Avatar color="#ff6b00">
              <img src={stravaLogo} alt="" />
            </Avatar>
          }
          leftAddonType="avatar"
          rightAddon={<OpenInNewFontIcon />}
          rightAddonType="icon"
          href={stravaAuthUrl}
        >
          <ListItemText secondaryText="…to view Strava activity">
            Authorize Strava App…
          </ListItemText>
        </ListItemLink>
      </List>
    );
  }

  if (!activity) {
    if (loading) {
      return (
        <CircularProgress
          id={`strava-activity-${activityId}`}
          circleStyle={{ stroke: "black" }}
        />
      );
    } else {
      return (
        <List>
          <SimpleListItem
            secondaryText="Make sure you can access the activity and it was recorded in Zwift."
            threeLines
          >
            An error occurred
          </SimpleListItem>
        </List>
      );
    }
  }

  return (
    <StravaActivityDetailsComponent
      activity={activity}
      onMouseHoverDistanceChange={onMouseHoverDistanceChange}
    />
  );
}
