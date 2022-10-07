import { SimpleListItem } from "@react-md/list";
import {
  EventSVGIcon,
  LandscapeSVGIcon,
  MapSVGIcon,
  SpaceBarSVGIcon,
  StarSVGIcon,
} from "@react-md/material-icons";
import { Route } from "zwift-data";
import { WORLDS_BY_SLUG } from "../../../../constants";
import { Distance } from "../../../Distance";
import { Elevation } from "../../../Elevation";

interface Props {
  route: Route;
}

export function RouteFacts({ route }: Props) {
  const world = WORLDS_BY_SLUG[route.world];

  return (
    <>
      <SimpleListItem leftAddon={<SpaceBarSVGIcon />} leftAddonType="icon">
        <Distance distance={route.distance} />
        {route.leadInDistance !== undefined && (
          <>
            &nbsp;
            <small>
              (<span role="presentation">+</span>
              <Distance
                distance={route.leadInDistance}
                label="Lead-in distance"
              />
              )
            </small>
          </>
        )}
      </SimpleListItem>

      <SimpleListItem leftAddon={<LandscapeSVGIcon />} leftAddonType="icon">
        <Elevation elevation={route.elevation} />
        {route.leadInElevation !== undefined && (
          <>
            &nbsp;
            <small>
              (<span role="presentation">+</span>
              <Elevation
                elevation={route.leadInElevation}
                label="Lead-in elevation"
              />
              )
            </small>
          </>
        )}
      </SimpleListItem>

      {route.experience && (
        <SimpleListItem
          leftAddon={<StarSVGIcon />}
          leftAddonType="icon"
          aria-label={`Experience: ${route.experience}`}
        >
          {route.experience}XP
        </SimpleListItem>
      )}

      {route.eventOnly && (
        <SimpleListItem leftAddon={<EventSVGIcon />} leftAddonType="icon">
          Event only route
        </SimpleListItem>
      )}

      <SimpleListItem
        leftAddon={<MapSVGIcon />}
        aria-label={`World: ${world.name}`}
      >
        {world.name}
      </SimpleListItem>
    </>
  );
}
