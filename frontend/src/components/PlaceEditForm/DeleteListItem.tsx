import { useAddMessage } from "@react-md/alert";
import { Button } from "@react-md/button";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@react-md/dialog";
import { ListItem } from "@react-md/list";
import { DeleteSVGIcon } from "@react-md/material-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId, useState } from "react";
import { worlds } from "zwift-data";
import { queries } from "../../react-query";
import { navigate } from "../../services/location-state";
import { deletePlace } from "../../services/zwiftMapApi";
import { Place } from "../../types";

interface Props {
  place: Place;
  disabled: boolean;
}

export function DeleteListItem({ place, disabled }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const deleteDialogTitleId = useId();
  const queryClient = useQueryClient();
  const addMessage = useAddMessage();

  const { mutate: handleDelete, isPending } = useMutation({
    mutationFn: async () => {
      if (!place) {
        return;
      }
      await deletePlace(place);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queries.placesBase });
      queryClient.invalidateQueries({
        queryKey: queries.worldPlacesBase(place.world),
      });
      addMessage({
        children: "Place was deleted",
      });
      navigate({
        type: "default",
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        world: worlds.find((w) => w.slug === place.world)!,
      });
    },
    onError: () =>
      addMessage({
        children: "Something went wrong",
      }),
  });

  return (
    <>
      <ListItem
        leftAddonType="icon"
        leftAddon={<DeleteSVGIcon />}
        onClick={() => setDialogOpen(true)}
        disabled={disabled}
      >
        Delete place
      </ListItem>

      <Dialog
        id={useId()}
        visible={dialogOpen}
        onRequestClose={() => setDialogOpen(false)}
        aria-labelledby={deleteDialogTitleId}
      >
        <DialogHeader>
          <DialogTitle id={deleteDialogTitleId}>
            Do you really want to delete this place?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button
            theme="primary"
            onClick={() => handleDelete()}
            disabled={isPending}
          >
            Yes, delete
          </Button>
          <Button onClick={() => setDialogOpen(false)} disabled={isPending}>
            No
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
