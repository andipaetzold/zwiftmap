import { useAddMessage } from "@react-md/alert";
import { ListItem, ListSubheader, SimpleListItem } from "@react-md/list";
import {
  ImageFontIcon,
  InsertLinkFontIcon,
  ShareFontIcon
} from "@react-md/material-icons";
import { useEffect, useRef } from "react";
import { createUrl } from "../../../../services/location-state/createUrl";
import {
  appendStravaDescription,
  StravaActivity
} from "../../../../services/StravaActivityRepository";
import { shareStravaActivity } from "../../../../services/zwiftMapApi";
import { shareImage } from "../../../../util";

const isSharingSupported = "share" in navigator;

interface Props {
  activity: StravaActivity;
}

export function StravaActivitySharing({ activity }: Props) {
  return (
    <>
      <ListSubheader>Sharing</ListSubheader>
      <ShareActivity activity={activity} />
      <ShareActivityAsImage activity={activity} />
      <AddLinkToActivityDescription activity={activity} />
      <SimpleListItem>
        <i>Sharing will store activity details on the ZwiftMap server.</i>
      </SimpleListItem>
    </>
  );
}

function ShareActivity({ activity }: Props) {
  const addMessage = useAddMessage();

  const handleClick = async () => {
    try {
      addMessage({ children: "Sharing…", messagePriority: "replace" });
      const { id: shareId } = await shareStravaActivity(activity.id);

      const path = createUrl({
        type: "share",
        shareId,
        world: null,
        query: "",
      });
      const url = new URL(path, window.location.origin).toString();

      if (isSharingSupported) {
        await navigator.share({
          title: activity.name,
          text: "View my activity on ZwiftMap",
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

  return (
    <ListItem
      rightAddon={<ShareFontIcon />}
      rightAddonType="icon"
      onClick={handleClick}
    >
      Share activity
    </ListItem>
  );
}

function ShareActivityAsImage({ activity }: Props) {
  const addMessage = useAddMessage();
  const pollInterval = useRef<any>();
  const pollCounter = useRef(0);

  const reset = () => {
    if (pollInterval.current) {
      clearInterval(pollInterval.current);
      pollInterval.current = undefined;
    }
    pollCounter.current = 0;
  };

  useEffect(() => reset, []);

  const handleClick = async () => {
    try {
      reset();

      addMessage({ children: "Generating image…", messagePriority: "replace" });
      const { id: shareId } = await shareStravaActivity(activity.id);

      const cloudinaryURL = `https://res.cloudinary.com/zwiftmap/image/upload/s/${shareId}.png`;

      const pollPromise = new Promise<void>((resolve, reject) => {
        pollInterval.current = setInterval(async () => {
          if (pollCounter.current > 5) {
            reset();
            reject();
          } else {
            try {
              const r = await fetch(cloudinaryURL, { method: "HEAD" });
              if (r.ok) {
                resolve();
              }
            } catch {
            } finally {
              pollCounter.current++;
            }
          }
        }, 2_500);
      });

      await pollPromise;

      if (isSharingSupported) {
        await shareImage(cloudinaryURL);
      } else {
        window.open(cloudinaryURL, "__blank");
      }
    } catch {
      addMessage({
        children: "Error sharing the acitivty",
        messagePriority: "replace",
      });
    }
  };

  return (
    <ListItem
      onClick={handleClick}
      rightAddon={<ImageFontIcon />}
      rightAddonType="icon"
    >
      Share activity as image
    </ListItem>
  );
}

function AddLinkToActivityDescription({ activity }: Props) {
  const addMessage = useAddMessage();

  const handleAddLink = async () => {
    try {
      addMessage({
        children: "Posting link to activity description…",
        messagePriority: "replace",
      });

      const { id: shareId } = await shareStravaActivity(activity.id);

      const path = createUrl({
        type: "share",
        shareId,
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
    <ListItem
      rightAddon={<InsertLinkFontIcon />}
      rightAddonType="icon"
      onClick={handleAddLink}
    >
      Add link to activity description
    </ListItem>
  );
}
