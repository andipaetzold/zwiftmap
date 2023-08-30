import {
  List,
  ListItemLink,
  ListItemText,
  ListSubheader,
} from "@react-md/list";
import { OpenInNewSVGIcon } from "@react-md/material-icons";
import { Route } from "zwift-data";
import {
  StravaAvatar,
  WhatsOnZwiftAvatar,
  ZwiftInsiderAvatar,
  ZwifterBikesAvatar,
} from "../../../Avatar";

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
            <div>
              <ZwiftInsiderAvatar />
            </div>
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
            <div>
              <StravaAvatar />
            </div>
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
            <div>
              <WhatsOnZwiftAvatar />
            </div>
          }
          leftAddonType="avatar"
          rightAddon={<OpenInNewSVGIcon />}
          rightAddonType="icon"
        >
          <ListItemText>What&apos;s on Zwift</ListItemText>
        </ListItemLink>
      )}
      {route.zwifterBikesUrl && (
        <ListItemLink
          href={route.zwifterBikesUrl}
          target="_blank"
          leftAddon={
            <div>
              <ZwifterBikesAvatar />
            </div>
          }
          leftAddonType="avatar"
          rightAddon={<OpenInNewSVGIcon />}
          rightAddonType="icon"
        >
          <ListItemText>ZwifterBikes</ListItemText>
        </ListItemLink>
      )}
    </List>
  );
}
