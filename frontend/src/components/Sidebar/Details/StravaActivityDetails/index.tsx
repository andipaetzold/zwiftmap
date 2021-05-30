import { Avatar } from "@react-md/avatar";
import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { List, ListItem, ListSubheader, SimpleListItem } from "@react-md/list";
import {
  LandscapeFontIcon,
  ListFontIcon,
  MapFontIcon,
  OpenInNewFontIcon,
  SpaceBarFontIcon,
  TimerFontIcon,
} from "@react-md/material-icons";
import { CircularProgress } from "@react-md/progress";
import { Text } from "@react-md/typography";
import React from "react";
import { useAsync } from "react-async-hook";
import stravaLogo from "../../../../assets/strava-40x40.png";
import { useIsLoggedInStrava } from "../../../../hooks/useIsLoggedInStrava";
import { useLocationState } from "../../../../hooks/useLocationState";
import { openStravaAuthUrl } from "../../../../services/strava/auth";
import { getStravaActivity } from "../../../../services/StravaActivityRepository";
import { Distance } from "../../../Distance";
import { Elevation } from "../../../Elevation";
import { Time } from "../../../Time";

interface Props {
  activityId: string;
}

export function StravaActivityDetails({ activityId }: Props) {
  const isLoggedInStrava = useIsLoggedInStrava();

  if (!isLoggedInStrava) {
    return (
      <List>
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
          onClick={openStravaAuthUrl}
        >
          Authorize Strava App…
        </ListItem>
      </List>
    );
  }

  return <StravaActivityDetailsWithToken activityId={activityId} />;
}

function StravaActivityDetailsWithToken({ activityId }: Props) {
  const [locationState, setLocationState] = useLocationState();

  const { result: activity, loading } = useAsync(getStravaActivity, [
    activityId,
  ]);

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
    <List>
      <SimpleListItem>
        <Button
          themeType="outline"
          onClick={() => {
            setLocationState({
              world: locationState.world,
              query: locationState.query,
              type: "strava-activities",
            });
          }}
        >
          <TextIconSpacing icon={<ListFontIcon />}>
            Strava activities
          </TextIconSpacing>
        </Button>
      </SimpleListItem>

      <SimpleListItem>
        <Text type="headline-6" style={{ margin: 0 }}>
          {activity.name}
        </Text>
      </SimpleListItem>

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

      <ListSubheader>Links</ListSubheader>
      <ListItem
        onClick={() =>
          window.open(
            `https://www.strava.com/activities/${activity.id}`,
            "_blank"
          )
        }
        leftAddon={
          <Avatar color="#000000">
            <img src={stravaLogo} alt="" />
          </Avatar>
        }
        leftAddonType="avatar"
        rightAddon={<OpenInNewFontIcon />}
        rightAddonType="icon"
      >
        Activity on Strava
      </ListItem>
    </List>
  );
}
