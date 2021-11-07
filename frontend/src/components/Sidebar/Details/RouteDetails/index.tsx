import { Avatar } from "@react-md/avatar";
import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { List, ListItem, ListSubheader, SimpleListItem } from "@react-md/list";
import {
  EventFontIcon,
  LandscapeFontIcon,
  ListFontIcon,
  MapFontIcon,
  OpenInNewFontIcon,
  SpaceBarFontIcon,
  StarFontIcon,
} from "@react-md/material-icons";
import { Text } from "@react-md/typography";
import { Route, worlds } from "zwift-data";
import stravaLogo from "../../../../assets/strava-40x40.png";
import whatsOnZwiftLogo from "../../../../assets/WhatsOnZwift-40x40.png";
import zwiftInsiderLogo from "../../../../assets/ZwiftInsider-40x40.jpg";
import { Distance } from "../../../Distance";
import { Elevation } from "../../../Elevation";
import { RouteElevationChart } from "../../ElevationChart";
import { RouteEvents } from "./RouteEvents";
import { RouteSegments } from "./RouteSegments";
import { RouteStravaPB } from "./RouteStravaPB";

interface Props {
  route: Route;
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
  backButtonText: string;
  onBackButtonClick: () => void;
}

export function RouteDetails({
  route,
  onMouseHoverDistanceChange,
  backButtonText,
  onBackButtonClick,
}: Props) {
  const world = worlds.find((w) => w.slug === route.world)!;

  return (
    <List>
      <SimpleListItem>
        <Button themeType="outline" onClick={onBackButtonClick}>
          <TextIconSpacing icon={<ListFontIcon />}>
            {backButtonText}
          </TextIconSpacing>
        </Button>
      </SimpleListItem>
      <SimpleListItem>
        <Text type="headline-6" style={{ margin: 0 }}>
          {route.name}
        </Text>
      </SimpleListItem>

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

      <RouteStravaPB route={route} />

      <SimpleListItem>
        <RouteElevationChart
          route={route}
          onMouseHoverDistanceChange={onMouseHoverDistanceChange}
        />
      </SimpleListItem>

      <ListSubheader>Upcoming Events</ListSubheader>
      <RouteEvents route={route} />

      <ListSubheader>Segments</ListSubheader>
      <RouteSegments route={route} />

      <ListSubheader>Links</ListSubheader>
      {route.zwiftInsiderUrl && (
        <ListItem
          onClick={() => window.open(route.zwiftInsiderUrl, "_blank")}
          leftAddon={
            <Avatar color="#fc6719">
              <img src={zwiftInsiderLogo} alt="" />
            </Avatar>
          }
          leftAddonType="avatar"
          rightAddon={<OpenInNewFontIcon />}
          rightAddonType="icon"
        >
          ZwiftInsider
        </ListItem>
      )}
      {route.stravaSegmentUrl && (
        <ListItem
          onClick={() => window.open(route.stravaSegmentUrl, "_blank")}
          leftAddon={
            <Avatar color="#ff6b00">
              <img src={stravaLogo} alt="" />
            </Avatar>
          }
          leftAddonType="avatar"
          rightAddon={<OpenInNewFontIcon />}
          rightAddonType="icon"
        >
          Strava Segment
        </ListItem>
      )}
      {route.whatsOnZwiftUrl && (
        <ListItem
          onClick={() => window.open(route.whatsOnZwiftUrl, "_blank")}
          leftAddon={
            <Avatar color="#000000">
              <img src={whatsOnZwiftLogo} alt="" />
            </Avatar>
          }
          leftAddonType="avatar"
          rightAddon={<OpenInNewFontIcon />}
          rightAddonType="icon"
        >
          What's on Zwift
        </ListItem>
      )}
    </List>
  );
}
