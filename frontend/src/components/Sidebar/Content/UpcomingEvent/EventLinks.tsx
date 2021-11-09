import { Avatar } from "@react-md/avatar";
import { ListItemLink, ListSubheader } from "@react-md/list";
import { OpenInNewFontIcon } from "@react-md/material-icons";
import { routes } from "zwift-data";
import stravaLogo from "../../../../assets/strava-40x40.png";
import whatsOnZwiftLogo from "../../../../assets/WhatsOnZwift-40x40.png";
import zwiftLogo from "../../../../assets/Zwift-40x40.png";
import zwiftInsiderLogo from "../../../../assets/ZwiftInsider-40x40.jpg";
import zwiftPowerLogo from "../../../../assets/ZwiftPower-40x40.png";
import { ZwiftEvent } from "../../../../services/events";

interface Props {
  event: ZwiftEvent;
}

export function EventLinks({ event }: Props) {
  const route = routes.find((r) => r.id === event.routeId);

  return (
    <>
      <ListSubheader>Links</ListSubheader>

      <ListItemLink href="https://google.com">test</ListItemLink>
      <ListItemLink
        href={`https://zwift.com/events/view/${event.id}`}
        target="_blank"
        leftAddon={
          <Avatar>
            <img src={zwiftLogo} alt="" />
          </Avatar>
        }
        leftAddonType="avatar"
        rightAddon={<OpenInNewFontIcon />}
        rightAddonType="icon"
      >
        Event on Zwift
      </ListItemLink>

      <ListItemLink
        href={`https://zwiftpower.com/events.php?zid=${event.id}`}
        target="_blank"
        leftAddon={
          <Avatar>
            <img src={zwiftPowerLogo} alt="" />
          </Avatar>
        }
        leftAddonType="avatar"
        rightAddon={<OpenInNewFontIcon />}
        rightAddonType="icon"
      >
        Event on ZwiftPower
      </ListItemLink>

      {route && (
        <>
          {route.zwiftInsiderUrl && (
            <ListItemLink
              href={route.zwiftInsiderUrl}
              target="_blank"
              leftAddon={
                <Avatar color="#fc6719">
                  <img src={zwiftInsiderLogo} alt="" />
                </Avatar>
              }
              leftAddonType="avatar"
              rightAddon={<OpenInNewFontIcon />}
              rightAddonType="icon"
            >
              Route on ZwiftInsider
            </ListItemLink>
          )}
          {route.stravaSegmentUrl && (
            <ListItemLink
              href={route.stravaSegmentUrl}
              target="_blank"
              leftAddon={
                <Avatar color="#ff6b00">
                  <img src={stravaLogo} alt="" />
                </Avatar>
              }
              leftAddonType="avatar"
              rightAddon={<OpenInNewFontIcon />}
              rightAddonType="icon"
            >
              Route on Strava Segment
            </ListItemLink>
          )}
          {route.whatsOnZwiftUrl && (
            <ListItemLink
              href={route.whatsOnZwiftUrl}
              target="_blank"
              leftAddon={
                <Avatar color="#000000">
                  <img src={whatsOnZwiftLogo} alt="" />
                </Avatar>
              }
              leftAddonType="avatar"
              rightAddon={<OpenInNewFontIcon />}
              rightAddonType="icon"
            >
              Route on What's on Zwift
            </ListItemLink>
          )}
        </>
      )}
    </>
  );
}
