import { Button } from "@react-md/button";
import { List, SimpleListItem } from "@react-md/list";
import {
  CloudSVGIcon,
  EventSVGIcon,
  ModeEditSVGIcon,
} from "@react-md/material-icons";
import { MenuItemSeparator } from "@react-md/menu";
import { Helmet } from "react-helmet-async";
import { routes } from "zwift-data";
import { useSessionSettings } from "../../../../hooks/useSessionSettings";
import { useSettings } from "../../../../hooks/useSettings";
import {
  LocationStateDefault,
  navigate,
} from "../../../../services/location-state";
import { sortRoute } from "../../../../util/sort";
import { StravaAvatar } from "../../../Avatar";
import { ListItemRoute } from "../../../ListItemRoute";
import { SortButton } from "../../../SortButton";
import styles from "./RouteList.module.scss";

interface Props {
  state: LocationStateDefault;
}

export function RouteList({ state }: Props) {
  const sport = useSettings((state) => state.sport);
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

      <List style={{ paddingTop: 0, paddingBottom: 0 }} role="presentation">
        <SimpleListItem className={styles.AvatarMenu} role="menu">
          <Button
            buttonType="icon"
            themeType="outline"
            title="Upcoming 200 events"
            onClick={() =>
              navigate({
                world: state.world,
                type: "events",
              })
            }
          >
            <EventSVGIcon />
          </Button>
          <Button
            buttonType="icon"
            themeType="outline"
            title="Custom route"
            onClick={() =>
              navigate({
                points: [null, null],
                world: state.world,
                type: "custom-route",
              })
            }
          >
            <ModeEditSVGIcon />
          </Button>
          <Button
            buttonType="icon"
            themeType="outline"
            title="Fog of Zwift"
            onClick={() => {
              navigate({
                world: state.world,
                type: "fog",
              });
            }}
          >
            <CloudSVGIcon />
          </Button>
          <Button
            buttonType="icon"
            themeType="outline"
            title="Recent Strava activities"
            onClick={() => {
              navigate({
                world: state.world,
                type: "strava-activities",
              });
            }}
          >
            <StravaAvatar />
          </Button>
        </SimpleListItem>

        <MenuItemSeparator />
      </List>

      <List
        style={{ paddingTop: 0 }}
        role="list"
        aria-label={`Routes in ${state.world.name}`}
      >
        <SortButton />
        {routes
          .filter((route) => route.world === state.world.slug)
          .filter((route) => route.sports.includes(sport))
          .filter((route) => route.stravaSegmentId !== undefined)
          .sort((a, b) => sortRoute(sortState, a, b))
          .map((route) => (
            <ListItemRoute
              route={route}
              key={route.slug}
              showWorldName={false}
            />
          ))}
      </List>
    </>
  );
}
