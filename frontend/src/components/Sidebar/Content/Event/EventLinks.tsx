import { ListItemLink, ListItemText, ListSubheader } from "@react-md/list";
import { OpenInNewSVGIcon } from "@react-md/material-icons";
import { routes } from "zwift-data";
import { ZwiftEvent } from "../../../../types";
import {
  StravaAvatar,
  WhatsOnZwiftAvatar,
  ZwiftAvatar,
  ZwiftInsiderAvatar,
  ZwiftPowerAvatar,
} from "../../../Avatar";

interface Props {
  event: ZwiftEvent;
}

export function EventLinks({ event }: Props) {
  const route = routes.find((r) => r.id === event.routeId);

  return (
    <>
      <ListSubheader>Links</ListSubheader>

      <ListItemLink
        href={`https://zwift.com/events/view/${event.id}`}
        target="_blank"
        leftAddon={
          <div>
            <ZwiftAvatar />
          </div>
        }
        leftAddonType="avatar"
        rightAddon={<OpenInNewSVGIcon />}
        rightAddonType="icon"
      >
        <ListItemText>Event on Zwift</ListItemText>
      </ListItemLink>

      <ListItemLink
        href={`https://zwiftpower.com/events.php?zid=${event.id}`}
        target="_blank"
        leftAddon={
          <div>
            <ZwiftPowerAvatar />
          </div>
        }
        leftAddonType="avatar"
        rightAddon={<OpenInNewSVGIcon />}
        rightAddonType="icon"
      >
        <ListItemText>Event on ZwiftPower</ListItemText>
      </ListItemLink>

      {route && (
        <>
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
              <ListItemText>Route on ZwiftInsider</ListItemText>
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
              <ListItemText>Route Segment on Strava</ListItemText>
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
              <ListItemText>Route on What&apos;s on Zwift</ListItemText>
            </ListItemLink>
          )}
        </>
      )}
    </>
  );
}
