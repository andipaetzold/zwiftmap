import { ListItemLink, ListItemText, SimpleListItem } from "@react-md/list";
import { OpenInNewSVGIcon, TimerSVGIcon } from "@react-md/material-icons";
import { Route } from "zwift-data";
import { useStravaSegment } from "../../../../react-query";
import { LoadingSpinner } from "../../../Loading";
import { Time } from "../../../Time";

interface Props {
  route: Route;
}

export function RouteStravaPB({ route }: Props) {
  const {
    data: segment,
    isLoading,
    isError,
  } = useStravaSegment(route.stravaSegmentId);

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

  if (isError || !segment) {
    return null;
  }

  return (
    <ListItemLink
      href={`https://www.strava.com/segments/${segment.id}`}
      target="_blank"
      leftAddon={<TimerSVGIcon />}
      leftAddonType="icon"
      rightAddon={<OpenInNewSVGIcon />}
      rightAddonType="icon"
    >
      <ListItemText>
        {segment.athlete_segment_stats.effort_count === 0 ? (
          <>No time set</>
        ) : (
          <Time seconds={segment.athlete_segment_stats.pr_elapsed_time!} />
        )}
      </ListItemText>
    </ListItemLink>
  );
}
