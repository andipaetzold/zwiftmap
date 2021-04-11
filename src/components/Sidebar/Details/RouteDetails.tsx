import { Avatar } from "@react-md/avatar";
import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { List, ListItem, ListSubheader, SimpleListItem } from "@react-md/list";
import {
  LandscapeFontIcon,
  ListFontIcon,
  OpenInNewFontIcon,
  SpaceBarFontIcon,
} from "@react-md/material-icons";
import { Text } from "@react-md/typography";
import round from "lodash/round";
import React from "react";
import stravaLogo from "../../../assets/strava-40x40.png";
import zwiftInsiderLogo from "../../../assets/ZwiftInsider-40x40.jpg";
import { Route } from "../../../types";
import { ElevationChart } from "../ElevationChart";
import { Link } from "@react-md/link";

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
  return (
    <List>
      <SimpleListItem>
        <Button themeType="outline" onClick={onBackButtonClick} >
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
        {round(route.distance, 1)}km&nbsp;
        <small>(+{round(route.leadInDistance, 1)}km)</small>
      </SimpleListItem>

      <SimpleListItem
        clickable={false}
        leftAddon={<LandscapeFontIcon />}
        leftAddonType="icon"
      >
        {round(route.elevation)}m&nbsp;
        <small>(+{round(route.leadInElevation)}m)</small>
      </SimpleListItem>

      <SimpleListItem>
        <ElevationChart
          route={route}
          onMouseHoverDistanceChange={onMouseHoverDistanceChange}
        />
      </SimpleListItem>

      <ListSubheader>Events</ListSubheader>
      <SimpleListItem>
        <Text type="caption">Upcoming events will show up here... soon</Text>
      </SimpleListItem>

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
    </List>
  );
}
