import polyline from "@mapbox/polyline";
import { Avatar } from "@react-md/avatar";
import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import {
  List,
  ListItem,
  ListItemLink,
  ListItemText,
  ListSubheader,
  SimpleListItem,
} from "@react-md/list";
import { ListFontIcon, OpenInNewFontIcon } from "@react-md/material-icons";
import React from "react";
import { useAsync } from "react-async-hook";
import stravaLogo from "../../../../assets/strava-40x40.png";
import { useIsLoggedInStrava } from "../../../../hooks/useIsLoggedInStrava";
import {
  LocationStateStravaActivities,
  useLocationState,
} from "../../../../services/location-state";
import { useStravaAuthUrl } from "../../../../services/strava/auth";
import { getStravaActivities } from "../../../../services/zwiftMapApi";
import { HoverData } from "../../../../types";
import { getWorld } from "../../../../util/strava";
import { Distance } from "../../../Distance";
import { Elevation } from "../../../Elevation";
import { LoadingSpinnerListItem } from "../../../Loading";
import { Time } from "../../../Time";

interface Props {
  onHoverRoute: (data: HoverData) => void;
}

export function StravaActivitiesList(props: Props) {
  const isLoggedInStrava = useIsLoggedInStrava();
  const stravaAuthUrl = useStravaAuthUrl();

  const [locationState, setLocationState] =
    useLocationState<LocationStateStravaActivities>();

  const backButton = (
    <SimpleListItem>
      <Button
        themeType="outline"
        onClick={() => {
          setLocationState({
            world: locationState.world,
            query: "",
            type: "default",
          });
        }}
      >
        <TextIconSpacing icon={<ListFontIcon />}>Route List</TextIconSpacing>
      </Button>
    </SimpleListItem>
  );

  if (isLoggedInStrava === null) {
    return (
      <List>
        {backButton}
        <LoadingSpinnerListItem />
      </List>
    );
  }

  if (!isLoggedInStrava) {
    return (
      <List>
        {backButton}
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
          <ListItemText secondaryText="…to view Strava activities">
            Authorize Strava App…
          </ListItemText>
        </ListItemLink>
      </List>
    );
  }

  return <StravaActivitiesListWithToken {...props} />;
}

export function StravaActivitiesListWithToken({ onHoverRoute }: Props) {
  const [locationState, setLocationState] =
    useLocationState<LocationStateStravaActivities>();

  const { result: activities } = useAsync(getStravaActivities, []);

  return (
    <List>
      <SimpleListItem>
        <Button
          themeType="outline"
          onClick={() => {
            setLocationState({
              world: locationState.world,
              query: "",
              type: "default",
            });
          }}
        >
          <TextIconSpacing icon={<ListFontIcon />}>Route List</TextIconSpacing>
        </Button>
      </SimpleListItem>

      <ListSubheader>Recent Strava Activities</ListSubheader>

      {activities === undefined && <LoadingSpinnerListItem />}

      {activities !== undefined &&
        activities
          .map((activity) => ({
            world: getWorld(activity.start_latlng)!,
            activity,
          }))
          .map(({ world, activity }) => (
            <ListItem
              key={activity.id}
              onClick={() => {
                onHoverRoute(undefined);
                setLocationState({
                  world: world!,
                  query: "",
                  type: "strava-activity",
                  stravaActivityId: activity.id,
                });
              }}
              onMouseEnter={() =>
                onHoverRoute({
                  type: "latlng",
                  latlng: polyline.decode(activity.map.summary_polyline),
                })
              }
              onMouseLeave={() => onHoverRoute(undefined)}
              secondaryText={
                <>
                  <Distance distance={activity.distance / 1_000} /> |{" "}
                  <Elevation elevation={activity.total_elevation_gain} />
                  <br />
                  {activity.average_watts && (
                    <>{Math.round(activity.average_watts)}W | </>
                  )}
                  <Time seconds={activity.moving_time} />
                </>
              }
              threeLines
            >
              {activity.name}
            </ListItem>
          ))}
    </List>
  );
}
