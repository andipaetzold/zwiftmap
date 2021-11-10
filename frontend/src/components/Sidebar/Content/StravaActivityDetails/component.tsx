import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { List, SimpleListItem } from "@react-md/list";
import { ListFontIcon } from "@react-md/material-icons";
import { Text } from "@react-md/typography";
import React from "react";
import {
  DEFAULT_WORLD,
  LocationStateStravaActivity,
  useLocationState,
} from "../../../../services/location-state";
import { StravaActivity } from "../../../../services/StravaActivityRepository";
import { ElevationChart } from "../../../ElevationChart";
import { StravaActivityFacts } from "./StravaActivityFacts";
import { StravaActivityLinks } from "./StravaActivityLinks";
import { StravaActivitySharing } from "./StravaActivitySharing";

interface Props {
  activity: StravaActivity;
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
}

export function StravaActivityDetailsComponent({
  activity,
  onMouseHoverDistanceChange,
}: Props) {
  const [locationState, setLocationState] =
    useLocationState<LocationStateStravaActivity>();

  return (
    <>
      <List>
        <SimpleListItem>
          <Button
            themeType="outline"
            onClick={() => {
              setLocationState({
                world: locationState.world ?? DEFAULT_WORLD,
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

        <StravaActivityFacts activity={activity} />

        <SimpleListItem>
          <ElevationChart
            distanceStream={activity.streams.distance}
            altitudeStream={activity.streams.altitude}
            onMouseHoverDistanceChange={onMouseHoverDistanceChange}
          />
        </SimpleListItem>

        <StravaActivityLinks activity={activity} />

        {process.env.NODE_ENV === "development" && (
          <StravaActivitySharing activity={activity} />
        )}
      </List>
    </>
  );
}
