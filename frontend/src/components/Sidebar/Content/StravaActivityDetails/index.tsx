import { Avatar } from "@react-md/avatar";
import {
  List,
  ListItemLink,
  ListItemText,
  SimpleListItem,
} from "@react-md/list";
import { OpenInNewFontIcon } from "@react-md/material-icons";
import * as Sentry from "@sentry/react";
import axios from "axios";
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
  const {
    result: activity,
    loading,
    error,
  } = useAsync(getStravaActivity, [activityId], {
    onError: (e) => Sentry.captureException(e),
  });

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

  if (error) {
    if (axios.isAxiosError(error)) {
      switch (error.response?.status) {
        case 403:
          return (
            <SimpleListItem threeLines>
              You do not have permission to access this activity. You can only
              access your own activities.
            </SimpleListItem>
          );

        case 404:
          return (
            <SimpleListItem threeLines>
              Could not find the requested Strava activity.
            </SimpleListItem>
          );

        case 429:
          return (
            <SimpleListItem threeLines>
              ZwiftMap received too many requests and got rate limited by
              Strava.
              <br />
              Please try again in a few minutes.
            </SimpleListItem>
          );
      }
    }

    return <SimpleListItem threeLines>An error occurred.</SimpleListItem>;
  }

  if (loading || activity === undefined) {
    return <LoadingSpinnerListItem />;
  }

  return (
    <StravaActivityDetailsComponent
      activity={activity}
      onMouseHoverDistanceChange={onMouseHoverDistanceChange}
    />
  );
}
