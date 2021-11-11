import { Avatar } from "@react-md/avatar";
import {
  List,
  ListItemLink,
  ListItemText,
  SimpleListItem
} from "@react-md/list";
import { OpenInNewFontIcon } from "@react-md/material-icons";
import React from "react";
import { useAsync } from "react-async-hook";
import stravaLogo from "../../../../assets/strava-40x40.png";
import { useIsLoggedInStrava } from "../../../../hooks/useIsLoggedInStrava";
import { useStravaAuthUrl } from "../../../../services/strava/auth";
import { getStravaActivity } from "../../../../services/StravaActivityRepository";
import { LoadingSpinnerListItem } from "../../../Loading";
import { BackButton } from "./BackButton";
import { StravaActivityDetailsComponent } from "./component";

interface Props {
  activityId: number;
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
}

export function StravaActivityDetails(props: Props) {
  return (
    <List>
      <BackButton />
      <StravaActivityDetailsContent {...props} />
    </List>
  );
}

function StravaActivityDetailsContent({
  activityId,
  onMouseHoverDistanceChange,
}: Props) {
  const isLoggedInStrava = useIsLoggedInStrava();
  const stravaAuthUrl = useStravaAuthUrl();
  const { result: activity, loading } = useAsync(getStravaActivity, [
    activityId,
  ]);

  if (isLoggedInStrava === null) {
    return <LoadingSpinnerListItem />;
  }

  if (!isLoggedInStrava) {
    return (
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
    );
  }

  if (loading) {
    return <LoadingSpinnerListItem />;
  }

  if (!activity) {
    return (
      <SimpleListItem
        secondaryText="Make sure you can access the activity and it was recorded in Zwift."
        threeLines
      >
        An error occurred
      </SimpleListItem>
    );
  }

  return (
    <StravaActivityDetailsComponent
      activity={activity}
      onMouseHoverDistanceChange={onMouseHoverDistanceChange}
    />
  );
}
