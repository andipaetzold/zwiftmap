import { Divider } from "@react-md/divider";
import { List } from "@react-md/list";
import { Helmet } from "react-helmet-async";
import { routes } from "zwift-data";
import { useIsLoggedInStrava } from "../../../../hooks/useIsLoggedInStrava";
import { useSessionSettings } from "../../../../hooks/useSessionSettings";
import { useSettings } from "../../../../hooks/useSettings";
import { LocationStateDefault } from "../../../../services/location-state";
import { HoverData } from "../../../../types";
import { sortRoute } from "../../../../util/sort";
import { ListItemRoute } from "../../../ListItemRoute";
import { ListItemState } from "../../../ListItemState";
import { SortButton } from "../../../SortButton";

interface Props {
  state: LocationStateDefault;
  onHoverRoute: (data: HoverData) => void;
}

export function RouteList({ state, onHoverRoute }: Props) {
  const [settings] = useSettings();
  const isLoggedIn = useIsLoggedInStrava();
  const [{ sortState }] = useSessionSettings();

  return (
    <>
      <Helmet>
        <title>{state.world.name}</title>
        <meta
          name="description"
          content={`List routes in ${state.world.name} on Zwift`}
        />

        <meta property="og:title" content={`${state.world.name} - ZwiftMap`} />
        <meta
          property="og:description"
          content={`List routes in ${state.world.name} on Zwift`}
        />
      </Helmet>

      <List style={{ paddingBottom: 0 }} role="menu">
        {isLoggedIn && (
          <ListItemState
            role="menuitem"
            secondaryText="Last 30 days"
            state={{
              world: state.world,
              type: "strava-activities",
            }}
            query=""
          >
            Recent Strava Activities
          </ListItemState>
        )}

        <ListItemState
          role="menuitem"
          secondaryText="Next 200 events"
          state={{
            world: state.world,
            type: "events",
          }}
          query=""
        >
          Upcoming Events
        </ListItemState>

        <Divider />
      </List>

      <List
        style={{ paddingTop: 0 }}
        role="list"
        aria-label={`Routes in ${state.world.name}`}
      >
        <SortButton />
        {routes
          .filter((route) => route.world === state.world.slug)
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
    </>
  );
}
