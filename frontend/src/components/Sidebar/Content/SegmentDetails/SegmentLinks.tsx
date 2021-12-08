import { Avatar } from "@react-md/avatar";
import { ListItemLink, ListItemText, ListSubheader } from "@react-md/list";
import { OpenInNewSVGIcon } from "@react-md/material-icons";
import { Segment } from "zwift-data";
import stravaLogo from "../../../../assets/strava-40x40.png";
import whatsOnZwiftLogo from "../../../../assets/WhatsOnZwift-40x40.png";

interface Props {
  segment: Segment;
}

export function SegmentLinks({ segment }: Props) {
  return (
    <>
      <ListSubheader>Links</ListSubheader>
      {segment.stravaSegmentUrl && (
        <ListItemLink
          href={segment.stravaSegmentUrl}
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
      {segment.whatsOnZwiftUrl && (
        <ListItemLink
          href={segment.whatsOnZwiftUrl}
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
    </>
  );
}
