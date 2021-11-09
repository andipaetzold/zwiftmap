import { Avatar } from "@react-md/avatar";
import { ListItem, ListSubheader } from "@react-md/list";
import { OpenInNewFontIcon } from "@react-md/material-icons";
import zwiftLogo from "../../../../assets/Zwift-40x40.png";
import zwiftPowerLogo from "../../../../assets/ZwiftPower-40x40.png";
import { ZwiftEvent } from "../../../../services/events";
import stravaLogo from "../../../../assets/strava-40x40.png";
import whatsOnZwiftLogo from "../../../../assets/WhatsOnZwift-40x40.png";
import zwiftInsiderLogo from "../../../../assets/ZwiftInsider-40x40.jpg";
import { routes } from "zwift-data";

interface Props {
  event: ZwiftEvent;
}

export function EventLinks({ event }: Props) {
  const route = routes.find((r) => r.id === event.routeId);

  return (
    <>
      <ListSubheader>Links</ListSubheader>

      <ListItem
        onClick={() =>
          window.open(`https://zwift.com/events/view/${event.id}`, "_blank")
        }
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
      </ListItem>

      <ListItem
        onClick={() =>
          window.open(
            `https://zwiftpower.com/events.php?zid=${event.id}`,
            "_blank"
          )
        }
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
      </ListItem>

      {route && (
        <>
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
              Route on ZwiftInsider
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
              Route on Strava Segment
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
              Route on What's on Zwift
            </ListItem>
          )}
        </>
      )}
    </>
  );
}
