import { useAddMessage } from "@react-md/alert";
import { ListItem, ListSubheader, SimpleListItem } from "@react-md/list";
import {
  ImageSVGIcon,
  InsertLinkSVGIcon,
  ShareSVGIcon,
} from "@react-md/material-icons";
import * as Sentry from "@sentry/react";
import { useEffect, useRef, useState } from "react";
import { createUrl } from "../../../../services/location-state";
import { request } from "../../../../services/request";
import {
  appendStravaDescription,
  StravaActivity,
} from "../../../../services/StravaActivityRepository";
import { shareStravaActivity } from "../../../../services/zwiftMapApi";
import { getShareImageUrl } from "../../../../util/image";
import { shareImage } from "../../../../util/shareImage";

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
  const [loading, setLoading] = useState<boolean>(false);

  const addMessage = useAddMessage();

  const handleClick = async () => {
    try {
      setLoading(true);

      const { id: shareId } = await shareStravaActivity(activity.id);

      const path = createUrl({
        type: "share",
        shareId,
        world: null,
      });
      const url = new URL(path, window.location.origin).toString();

      if (isSharingSupported) {
        try {
          await navigator.share({ title: `${activity.name} - ZwiftMap`, url });
        } catch (e) {
          if (e instanceof DOMException && e.name === "AbortError") {
            // ignore
          } else if (
            e instanceof DOMException &&
            e.name === "NotAllowedError"
          ) {
            await navigator.clipboard.writeText(url);
            addMessage({ children: "URL copied to the clipboard" });
          } else {
            throw e;
          }
        }
      } else {
        await navigator.clipboard.writeText(url);
        addMessage({ children: "URL copied to the clipboard" });
      }
    } catch (e) {
      Sentry.captureException(e);
      addMessage({ children: "Error sharing the acitivty" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ListItem
      rightAddon={<ShareSVGIcon />}
      rightAddonType="icon"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? "Sharing???" : "Share activity"}
    </ListItem>
  );
}

function ShareActivityAsImage({ activity }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
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
      setLoading(true);

      const { id: shareId } = await shareStravaActivity(activity.id);

      const imageUrl = getShareImageUrl(shareId);

      await shareImage(imageUrl);
    } catch (e) {
      Sentry.captureException(e);
      addMessage({ children: "Error sharing the acitivty" });
    } finally {
      reset();
      setLoading(false);
    }
  };

  return (
    <ListItem
      onClick={handleClick}
      rightAddon={<ImageSVGIcon />}
      rightAddonType="icon"
      disabled={loading}
    >
      {loading ? "Generating image???" : "Share activity as image"}
    </ListItem>
  );
}

function AddLinkToActivityDescription({ activity }: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const addMessage = useAddMessage();

  const handleAddLink = async () => {
    try {
      setLoading(true);

      const { id: shareId } = await shareStravaActivity(activity.id);

      const path = createUrl({
        type: "share",
        shareId,
        world: null,
      });

      const url = new URL(path, window.location.origin).toString();
      await appendStravaDescription(activity.id, `View on ZwiftMap:\n${url}`);

      addMessage({ children: "Link posted to activity description" });
    } catch (e) {
      Sentry.captureException(e);
      addMessage({ children: "Error posting link to activity description" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ListItem
      rightAddon={<InsertLinkSVGIcon />}
      rightAddonType="icon"
      onClick={handleAddLink}
      disabled={loading}
    >
      {loading
        ? "Posting link to activity description???"
        : "Add link to activity description"}
    </ListItem>
  );
}
