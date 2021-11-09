import { useAddMessage } from "@react-md/alert";
import {
    ListItem,
    ListItemText,
    ListSubheader,
    SimpleListItem
} from "@react-md/list";
import { InsertLinkFontIcon, ShareFontIcon } from "@react-md/material-icons";
import { StravaActivity } from "../../../../services/StravaActivityRepository";
import { zwiftMapApi } from "../../../../services/zwiftMapApi";

interface Props {
  activity: StravaActivity;
}

export function StravaActivitySharing({ activity }: Props) {
  const addMessage = useAddMessage();

  const handleShare = async () => {
    try {
      addMessage({ children: "Sharing…", messagePriority: "replace" });
      const response = await zwiftMapApi.post<{ url: string }>(
        "/strava/share-activity",
        {
          activityId: activity.id,
        }
      );

      const url = response.data.url;
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
      await zwiftMapApi.post<{ url: string }>("/strava/add-activity-link", {
        activityId: activity.id,
      });
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
        <ListItemText>
          <i>Sharing will store activity details on the ZwiftMap server.</i>
        </ListItemText>
      </SimpleListItem>
    </>
  );
}
