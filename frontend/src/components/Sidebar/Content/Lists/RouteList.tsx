import { Divider } from "@react-md/divider";
import { List, ListItem } from "@react-md/list";
import { Helmet } from "react-helmet-async";
import { routes } from "zwift-data";
import { useIsLoggedInStrava } from "../../../../hooks/useIsLoggedInStrava";
import { useSessionSettings } from "../../../../hooks/useSessionSettings";
import { useSettings } from "../../../../hooks/useSettings";
import { useStore } from "../../../../hooks/useStore";
import {
  LocationStateDefault,
  useLocationState,
} from "../../../../services/location-state";
import { HoverData } from "../../../../types";
import { sortRoute } from "../../../../util/sort";
import { ListItemRoute } from "../../../ListItemRoute";
import { SortButton } from "../../../SortButton";

interface Props {
  onHoverRoute: (data: HoverData) => void;
}

export function RouteList({ onHoverRoute }: Props) {
  const [settings] = useSettings();
  const [locationState, setLocationState] =
    useLocationState<LocationStateDefault>();
  const setQuery = useStore((state) => state.setQuery);
  const isLoggedIn = useIsLoggedInStrava();
  const [{ sortState }] = useSessionSettings();

  const handleStravaClick = () => {
    setQuery("");
    setLocationState({
      world: locationState.world,
      type: "strava-activities",
    });
  };

  const handleUpcomingEvents = () => {
    setQuery("");
    setLocationState({
      world: locationState.world,
      type: "events",
    });
  };

  return (
    <List>
      <Helmet>
        <title>{locationState.world.name}</title>
      </Helmet>

      {isLoggedIn && (
        <ListItem secondaryText="Last 30 days" onClick={handleStravaClick}>
          Recent Strava Activities
        </ListItem>
      )}

      <ListItem secondaryText="Next 200 events" onClick={handleUpcomingEvents}>
        Upcoming Events
      </ListItem>

      <Divider />

      <SortButton />
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
