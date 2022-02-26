import { ListItemLink, ListItemText, SimpleListItem } from "@react-md/list";
import { OpenInNewSVGIcon, TimerSVGIcon } from "@react-md/material-icons";
import { useAsync } from "react-async-hook";
import { Route } from "zwift-data";
import {
  IsLoggedInStrava,
  useIsLoggedInStrava
} from "../../../../hooks/useIsLoggedInStrava";
import { getStravaSegmentById } from "../../../../services/zwiftMapApi";
import { LoadingSpinner, LoadingSpinnerListItem } from "../../../Loading";
import { Time } from "../../../Time";

interface Props {
  route: Route;
}

export function RouteStravaPB({ route }: Props) {
  const isLoggedInStrava = useIsLoggedInStrava();

  const {
    result: segment,
    loading,
    error,
  } = useAsync(
    async (loggedIn: IsLoggedInStrava, segmentId?: number) => {
      if (loggedIn !== true || segmentId === undefined) {
        return null;
      }

      return await getStravaSegmentById(segmentId);
    },
    [isLoggedInStrava, route.stravaSegmentId]
  );

  if (isLoggedInStrava === null) {
    return <LoadingSpinnerListItem />;
  }

  if (loading) {
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

  if (error || segment === null || segment === undefined) {
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
