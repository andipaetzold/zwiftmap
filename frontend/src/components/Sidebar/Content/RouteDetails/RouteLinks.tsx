import { Avatar } from "@react-md/avatar";
import { ListItemLink, ListItemText, ListSubheader } from "@react-md/list";
import { OpenInNewFontIcon } from "@react-md/material-icons";
import { Route } from "zwift-data";
import stravaLogo from "../../../../assets/strava-40x40.png";
import whatsOnZwiftLogo from "../../../../assets/WhatsOnZwift-40x40.png";
import zwiftInsiderLogo from "../../../../assets/ZwiftInsider-40x40.jpg";

interface Props {
  route: Route;
}

export function RouteLinks({ route }: Props) {
  return (
    <>
      <ListSubheader>Links</ListSubheader>
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
          rightAddon={<OpenInNewFontIcon />}
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
          rightAddon={<OpenInNewFontIcon />}
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
          rightAddon={<OpenInNewFontIcon />}
          rightAddonType="icon"
        >
          <ListItemText>What's on Zwift</ListItemText>
        </ListItemLink>
      )}
    </>
  );
}
