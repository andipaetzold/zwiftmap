import { SimpleListItem } from "@react-md/list";
import {
    EventFontIcon,
    LandscapeFontIcon,
    MapFontIcon,
    SpaceBarFontIcon,
    StarFontIcon
} from "@react-md/material-icons";
import { Route, worlds } from "zwift-data";
import { Distance } from "../../../Distance";
import { Elevation } from "../../../Elevation";

interface Props {
  route: Route;
}

export function RouteFacts({ route }: Props) {
  const world = worlds.find((w) => w.slug === route.world)!;

  return (
    <>
      <SimpleListItem
        clickable={false}
        leftAddon={<SpaceBarFontIcon />}
        leftAddonType="icon"
      >
        <Distance distance={route.distance} />
        {route.leadInDistance !== undefined && (
          <>
            &nbsp;
            <small>
              (+
              <Distance distance={route.leadInDistance} />)
            </small>
          </>
        )}
      </SimpleListItem>

      <SimpleListItem
        clickable={false}
        leftAddon={<LandscapeFontIcon />}
        leftAddonType="icon"
      >
        <Elevation elevation={route.elevation} />
        {route.leadInElevation !== undefined && (
          <>
            &nbsp;
            <small>
              (+
              <Elevation elevation={route.leadInElevation} />)
            </small>
          </>
        )}
      </SimpleListItem>

      {route.experience && (
        <SimpleListItem
          clickable={false}
          leftAddon={<StarFontIcon />}
          leftAddonType="icon"
        >
          {route.experience}XP
        </SimpleListItem>
      )}

      {route.eventOnly && (
        <SimpleListItem
          clickable={false}
          leftAddon={<EventFontIcon />}
          leftAddonType="icon"
        >
          Event only route
        </SimpleListItem>
      )}

      <SimpleListItem clickable={false} leftAddon={<MapFontIcon />}>
        {world.name}
      </SimpleListItem>
    </>
  );
}
