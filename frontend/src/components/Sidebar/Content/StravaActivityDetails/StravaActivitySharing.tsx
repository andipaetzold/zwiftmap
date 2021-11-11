import { useAddMessage } from "@react-md/alert";
import { ListItem, ListSubheader, SimpleListItem } from "@react-md/list";
import { InsertLinkFontIcon, ShareFontIcon } from "@react-md/material-icons";
import { createUrl } from "../../../../services/location-state/createUrl";
import {
  appendStravaDescription,
  StravaActivity,
} from "../../../../services/StravaActivityRepository";
import { zwiftMapApi } from "../../../../services/zwiftMapApi";

interface Props {
  activity: StravaActivity;
}

export function StravaActivitySharing({ activity }: Props) {
  const addMessage = useAddMessage();

  const handleShare = async () => {
    try {
      addMessage({ children: "Sharing…", messagePriority: "replace" });
      const response = await zwiftMapApi.post<{ id: string }>("/share", {
        type: "strava-activity",
        stravaActivityId: activity.id,
      });

      const path = createUrl({
        type: "share",
        shareId: response.data.id,
        world: null,
        query: "",
      });
      const url = new URL(path, window.location.origin).toString();

      if (navigator.share) {
        await navigator.share({
          title: `${activity.name} - ZwiftMap`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        addMessage({
          children: "URL copied to the clipboard",
          messagePriority: "replace",
        });
      }
    } catch {
      addMessage({
        children: "Error sharing the acitivty",
        messagePriority: "replace",
      });
    }
  };

  const handleAddLink = async () => {
    try {
      addMessage({
        children: "Posting link to activity description…",
        messagePriority: "replace",
      });

      const response = await zwiftMapApi.post<{ id: string }>("/share", {
        type: "strava-activity",
        stravaActivityId: activity.id,
      });

      const path = createUrl({
        type: "share",
        shareId: response.data.id,
        world: null,
        query: "",
      });

      const url = new URL(path, window.location.origin).toString();
      await appendStravaDescription(activity.id, `View on ZwiftMap:\n${url}`);

      addMessage({
        children: "Link posted to activity description",
        messagePriority: "replace",
      });
    } catch {
      addMessage({
        children: "Error posting link to activity description",
        messagePriority: "replace",
      });
    }
  };

  return (
    <>
      <ListSubheader>Sharing</ListSubheader>
      <ListItem
        rightAddon={<ShareFontIcon />}
        rightAddonType="icon"
        onClick={handleShare}
      >
        Share activity
      </ListItem>
      <ListItem
        rightAddon={<InsertLinkFontIcon />}
        rightAddonType="icon"
        onClick={handleAddLink}
      >
        Add link to activity description
      </ListItem>
      <SimpleListItem>
        <i>Sharing will store activity details on the ZwiftMap server.</i>
      </SimpleListItem>
    </>
  );
}
