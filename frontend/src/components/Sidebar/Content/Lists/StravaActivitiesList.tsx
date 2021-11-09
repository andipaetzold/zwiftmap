import { Avatar } from "@react-md/avatar";
import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { List, ListItem, ListSubheader, SimpleListItem } from "@react-md/list";
import { ListFontIcon, OpenInNewFontIcon } from "@react-md/material-icons";
import { CircularProgress } from "@react-md/progress";
import React from "react";
import { useAsync } from "react-async-hook";
import { SummaryActivity } from "strava";
import stravaLogo from "../../../../assets/strava-40x40.png";
import { useIsLoggedInStrava } from "../../../../hooks/useIsLoggedInStrava";
import { useLocationState } from "../../../../hooks/useLocationState";
import { getLoggedInAthleteActivities } from "../../../../services/strava/api";
import { openStravaAuthUrl } from "../../../../services/strava/auth";
import { getWorld } from "../../../../util/strava";
import { Distance } from "../../../Distance";
import { Elevation } from "../../../Elevation";
import { Time } from "../../../Time";

const PER_PAGE = 30;

const monthInSeconds = 30 * 24 * 60 * 60;
const now = new Date().getTime() / 1_000;

export function StravaActivitiesList() {
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
          secondaryText="…to view Strava activities"
          onClick={openStravaAuthUrl}
        >
          Authorize Strava App…
        </ListItem>
      </List>
    );
  }

  return <StravaActivitiesListWithToken />;
}

export function StravaActivitiesListWithToken() {
  const [locationState, setLocationState] = useLocationState();

  const { result: activities } = useAsync(async () => {
    const result: SummaryActivity[] = [];

    let page = 1;
    let newResults = [];
    do {
      newResults = await getLoggedInAthleteActivities({
        after: now - monthInSeconds,
        per_page: PER_PAGE,
        page,
      });
      result.push(...newResults);
      ++page;
    } while (newResults.length === PER_PAGE);
    return result;
  }, []);

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

      {activities === undefined && (
        <SimpleListItem>
          <CircularProgress
            id="strava-activities"
            circleStyle={{ stroke: "black" }}
          />
        </SimpleListItem>
      )}

      {activities !== undefined &&
        [...activities]
          .sort((a, b) => -a.start_date.localeCompare(b.start_date))
          .filter((activity) =>
            ["VirtualRun", "VirtualRide"].includes(activity.type)
          )
          .map((activity) => {
            const world = getWorld(activity);
            return { world, activity };
          })
          .filter(({ world }) => world !== undefined)
          .map(({ world, activity }) => (
            <ListItem
              key={activity.id}
              onClick={() => {
                setLocationState({
                  world: world!,
                  query: "",
                  type: "strava-activity",
                  stravaActivityId: activity.id.toString(),
                });
              }}
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
