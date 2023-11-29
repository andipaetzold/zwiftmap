import { ListItemLink, ListItemText, SimpleListItem } from "@react-md/list";
import { OpenInNewSVGIcon, TimerSVGIcon } from "@react-md/material-icons";
import { Segment } from "zwift-data";
import { useStravaSegment } from "../../../../react-query";
import { LoadingSpinner } from "../../../Loading";
import { Time } from "../../../Time";

interface Props {
  segment: Segment;
}

export function SegmentStravaPB({ segment }: Props) {
  const {
    data: stravaSegment,
    isLoading,
    isError,
  } = useStravaSegment(segment.stravaSegmentId);

  if (isLoading) {
    return (
      <SimpleListItem
        leftAddon={<TimerSVGIcon />}
        leftAddonType="icon"
        rightAddon={<OpenInNewSVGIcon />}
        rightAddonType="icon"
      >
        <LoadingSpinner small />
      </SimpleListItem>
    );
  }

  if (isError || !stravaSegment) {
    return null;
  }

  return (
    <ListItemLink
      href={`https://www.strava.com/segments/${stravaSegment.id}`}
      target="_blank"
      leftAddon={<TimerSVGIcon />}
      leftAddonType="icon"
      rightAddon={<OpenInNewSVGIcon />}
      rightAddonType="icon"
    >
      <ListItemText>
        {stravaSegment.athlete_segment_stats.effort_count === 0 ? (
          <>No time set</>
        ) : (
          <Time
            seconds={stravaSegment.athlete_segment_stats.pr_elapsed_time!}
          />
        )}
      </ListItemText>
    </ListItemLink>
  );
}
