import { SimpleListItem } from "@react-md/list";
import { Text } from "@react-md/typography";
import React from "react";
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
  return (
    <>
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
      <StravaActivitySharing activity={activity} />
    </>
  );
}
