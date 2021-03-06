import { Avatar } from "@react-md/avatar";
import {
  List,
  ListItemLink,
  ListItemText,
  ListSubheader,
} from "@react-md/list";
import { OpenInNewSVGIcon } from "@react-md/material-icons";
import { Route } from "zwift-data";
import stravaLogo from "../../../../assets/strava-40x40.png";
import whatsOnZwiftLogo from "../../../../assets/WhatsOnZwift-40x40.png";
import zwiftInsiderLogo from "../../../../assets/ZwiftInsider-40x40.jpg";

interface Props {
  route: Route;
}

export function RouteLinks({ route }: Props) {
  return (
    <List
      style={{ marginTop: 0, marginBottom: 0 }}
      aria-labelledby="route-links-header"
      role="list"
    >
      <ListSubheader id="route-links-header" role="presentation">
        Links
      </ListSubheader>
      {route.zwiftInsiderUrl && (
        <ListItemLink
          href={route.zwiftInsiderUrl}
          target="_blank"
          leftAddon={
            <Avatar>
              <img src={zwiftInsiderLogo} alt="" />
            </Avatar>
          }
          leftAddonType="avatar"
          rightAddon={<OpenInNewSVGIcon />}
          rightAddonType="icon"
        >
          <ListItemText>ZwiftInsider</ListItemText>
        </ListItemLink>
      )}
      {route.stravaSegmentUrl && (
        <ListItemLink
          href={route.stravaSegmentUrl}
          target="_blank"
          leftAddon={
            <Avatar>
              <img src={stravaLogo} alt="" />
            </Avatar>
          }
          leftAddonType="avatar"
          rightAddon={<OpenInNewSVGIcon />}
          rightAddonType="icon"
        >
          <ListItemText>Strava Segment</ListItemText>
        </ListItemLink>
      )}
      {route.whatsOnZwiftUrl && (
        <ListItemLink
          href={route.whatsOnZwiftUrl}
          target="_blank"
          leftAddon={
            <Avatar>
              <img src={whatsOnZwiftLogo} alt="" />
            </Avatar>
          }
          leftAddonType="avatar"
          rightAddon={<OpenInNewSVGIcon />}
          rightAddonType="icon"
        >
          <ListItemText>What's on Zwift</ListItemText>
        </ListItemLink>
      )}
    </List>
  );
}
