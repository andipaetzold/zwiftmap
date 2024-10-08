import { useAddMessage } from "@react-md/alert";
import { ListItem, ListSubheader, SimpleListItem } from "@react-md/list";
import { ImageSVGIcon, ShareSVGIcon } from "@react-md/material-icons";
import { captureException } from "@sentry/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { createUrl } from "../../../../services/location-state";
import { StravaActivity } from "../../../../services/StravaActivityRepository";
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
      {/* <AddLinkToActivityDescription activity={activity} /> */}
      <SimpleListItem>
        <i>Sharing will store activity details on the ZwiftMap server.</i>
      </SimpleListItem>
    </>
  );
}

function ShareActivity({ activity }: Props) {
  const { mutate: createShare, isPending } = useMutation({
    mutationFn: async () => {
      const share = await shareStravaActivity(activity.id);

      const path = createUrl({ type: "share", shareId: share.id, world: null });
      const url = new URL(path, window.location.origin).toString();

      const copyToClipboard = async () => {
        await navigator.clipboard.writeText(url);
        addMessage({ children: "URL copied to the clipboard" });
      };

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
            await copyToClipboard();
          } else {
            throw e;
          }
        }
      } else {
        await copyToClipboard();
      }
    },
    onError: (e) => {
      captureException(e);
      addMessage({ children: "Error sharing the acitivty" });
    },
  });

  const addMessage = useAddMessage();

  return (
    <ListItem
      rightAddon={<ShareSVGIcon />}
      rightAddonType="icon"
      onClick={() => createShare()}
      disabled={isPending}
    >
      {isPending ? "Sharing…" : "Share activity"}
    </ListItem>
  );
}

function ShareActivityAsImage({ activity }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const addMessage = useAddMessage();
  const pollInterval = useRef<number>();
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

      await shareImage(imageUrl, `share-${shareId}.png`);
    } catch (e) {
      captureException(e);
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
      {loading ? "Generating image…" : "Share as image"}
    </ListItem>
  );
}

// function AddLinkToActivityDescription({ activity }: Props) {
//   const [loading, setLoading] = useState<boolean>(false);

//   const addMessage = useAddMessage();

//   const handleAddLink = async () => {
//     try {
//       setLoading(true);

//       const { id: shareId } = await shareStravaActivity(activity.id);

//       const path = createUrl({
//         type: "share",
//         shareId,
//         world: null,
//       });

//       const url = new URL(path, window.location.origin).toString();
//       await appendStravaDescription(activity.id, `View on ZwiftMap:\n${url}`);

//       addMessage({ children: "Link posted to activity description" });
//     } catch (e) {
//       captureException(e);
//       addMessage({ children: "Error posting link to activity description" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ListItem
//       rightAddon={<InsertLinkSVGIcon />}
//       rightAddonType="icon"
//       onClick={handleAddLink}
//       disabled={loading}
//     >
//       {loading
//         ? "Posting link to activity description…"
//         : "Add link to activity description"}
//     </ListItem>
//   );
// }
