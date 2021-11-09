import { Divider } from "@react-md/divider";
import { List, ListItem } from "@react-md/list";
import { useState } from "react";
import { routes } from "zwift-data";
import { useIsLoggedInStrava } from "../../../../hooks/useIsLoggedInStrava";
import { useLocationState } from "../../../../hooks/useLocationState";
import { useSettings } from "../../../../hooks/useSettings";
import { sortRoute } from "../../../../util/sort";
import { SortButton, SortState } from "../../../SortButton";
import { ListItemRoute } from "./Items/ListItemRoute";

interface Props {
  onHoverRoute: (route?: string) => void;
}

export function RouteList({ onHoverRoute }: Props) {
  const [settings] = useSettings();
  const [locationState, setLocationState] = useLocationState();
  const isLoggedIn = useIsLoggedInStrava();
  const [sortState, setSortState] = useState<SortState>({
    key: "name",
    dir: "ASC",
  });

  const handleStravaClick = () => {
    setLocationState({
      world: locationState.world,
      query: "",
      type: "strava-activities",
    });
  };

  const handleUpcomingEvents = () => {
    setLocationState({
      world: locationState.world,
      query: "",
      type: "events",
    });
  };

  return (
    <List>
      {isLoggedIn && (
        <ListItem secondaryText="Last 30 days" onClick={handleStravaClick}>
          Recent Strava Activities
        </ListItem>
      )}

      <ListItem secondaryText="Next 7 days" onClick={handleUpcomingEvents}>
        Upcoming Events
      </ListItem>

      <Divider />

      <SortButton state={sortState} onChange={setSortState} />
      {routes
        .filter((route) => route.world === locationState.world.slug)
        .filter((route) => route.sports.includes(settings.sport))
        .filter((route) => route.stravaSegmentId !== undefined)
        .sort((a, b) => sortRoute(sortState, a, b))
        .map((route) => (
          <ListItemRoute
            route={route}
            key={route.slug}
            onHoverRoute={onHoverRoute}
            showWorldName={false}
          />
        ))}
    </List>
  );
}
