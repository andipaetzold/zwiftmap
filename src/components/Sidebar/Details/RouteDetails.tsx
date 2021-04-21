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
} from "@react-md/material-icons";
import { CircularProgress } from "@react-md/progress";
import { Text } from "@react-md/typography";
import round from "lodash/round";
import React, { useMemo } from "react";
import { useAsync } from "react-async-hook";
import stravaLogo from "../../../assets/strava-40x40.png";
import whatsOnZwiftLogo from "../../../assets/WhatsOnZwift-40x40.png";
import zwiftInsiderLogo from "../../../assets/ZwiftInsider-40x40.jpg";
import { worlds } from "../../../data";
import { fetchEvents } from "../../../services/fetchEvents";
import { Route } from "../../../types";
import { ElevationChart } from "../ElevationChart";

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
        {round(route.distance, 1)}km
        {route.leadInDistance !== undefined && (
          <>
            &nbsp;
            <small>(+{round(route.leadInDistance, 1)}km)</small>
          </>
        )}
      </SimpleListItem>

      <SimpleListItem
        clickable={false}
        leftAddon={<LandscapeFontIcon />}
        leftAddonType="icon"
      >
        {round(route.elevation)}m
        {route.leadInElevation !== undefined && (
          <>
            &nbsp;
            <small>(+{round(route.leadInElevation)}m)</small>
          </>
        )}
      </SimpleListItem>

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

      <SimpleListItem>
        <ElevationChart
          route={route}
          onMouseHoverDistanceChange={onMouseHoverDistanceChange}
        />
      </SimpleListItem>

      <RouteEvents route={route} />

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

interface RouteEventsProps {
  route: Route;
}

function RouteEvents({ route }: RouteEventsProps) {
  const { result: events } = useAsync(fetchEvents, []);
  const filteredEvents = useMemo(() => {
    if (!events) {
      return;
    }

    return events
      .filter((event) => {
        const eventRouteIds = [
          event.routeId,
          ...event.eventSubgroups.map((esg) => esg.routeId),
        ];

        return eventRouteIds.some((erid) =>
          route.routeIds.find((rid) => rid === erid)
        );
      })
      .sort((a, b) => a.eventStart.localeCompare(b.eventStart));
  }, [events, route]);

  if (filteredEvents === undefined) {
    return (
      <SimpleListItem>
        <CircularProgress
          id="loading-events"
          small
          circleStyle={{ stroke: "black" }}
        />
      </SimpleListItem>
    );
  }

  if (filteredEvents.length === 0) {
    return (
      <SimpleListItem>
        <Text type="body-2">No events on this route today.</Text>
      </SimpleListItem>
    );
  }

  return (
    <>
      <ListSubheader>Upcoming Events</ListSubheader>
      {filteredEvents.slice(0, 3).map((event) => (
        <ListItem
          key={event.id}
          onClick={() =>
            window.open(`http://zwift.com/events/view/${event.id}`, "_blank")
          }
          rightAddon={<EventFontIcon />}
          rightAddonType="icon"
          secondaryText={new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            weekday: "short",
          }).format(Date.parse(event.eventStart))}
        >
          {event.name}
        </ListItem>
      ))}
      {filteredEvents.length > 3 && (
        <SimpleListItem>
          <Text type="body-2">
            {filteredEvents.length - 3} more events happening today
          </Text>
        </SimpleListItem>
      )}
    </>
  );
}
