import { useAddMessage } from "@react-md/alert";
import { Button } from "@react-md/button";
import { TextArea, TextField } from "@react-md/form";
import { TextIconSpacing } from "@react-md/icon";
import { ListSubheader, SimpleListItem } from "@react-md/list";
import {
  AddSVGIcon,
  ClearSVGIcon,
  PlaceSVGIcon,
  SendSVGIcon,
} from "@react-md/material-icons";
import { Typography } from "@react-md/typography";
import { useMutation } from "@tanstack/react-query";
import { LatLngTuple } from "leaflet";
import { FormEvent, useEffect, useId, useState } from "react";
import { World } from "zwift-data";
import { emitter } from "../../services/emitter";
import { createPlace, updatePlace } from "../../services/zwiftMapApi";
import { Place } from "../../types";
import styles from "./styles.module.scss";

interface Props {
  world: World;
  place?: Place;
}

export function PlaceEditForm({ place, world }: Props) {
  const [name, setName] = useState(place?.name ?? "");
  const [position, setPosition] = useState<LatLngTuple | null>(
    place?.position ?? null
  );
  const [description, setDescription] = useState(place?.description ?? "");
  const [links, setLinks] = useState<string[]>(place?.links ?? []);
  const addMessage = useAddMessage();

  const linkIdPrefix = useId();

  useEffect(() => {
    const listener = (pos: LatLngTuple) => setPosition(pos);
    emitter.on("placeMarkerMove", listener);
    return () => emitter.off("placeMarkerMove", listener);
  }, []);

  const { mutate: handleSubmit } = useMutation<
    unknown,
    string,
    FormEvent<HTMLFormElement>
  >(
    async (e) => {
      e.preventDefault();

      if (place) {
        await updatePlace({
          ...place,
          name,
          description,
          links,
          world: world.slug,
          // We have form validation
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          position: position!,
        });
      } else {
        await createPlace({
          name,
          description,
          links,
          world: world.slug,
          // We have form validation
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          position: position!,
        });
      }
    },
    {
      onSuccess: () => {
        setPosition(null);
        setName("");
        setDescription("");
        setLinks([]);
        addMessage({
          children: place
            ? "Place was updated"
            : "New place was submitted successfully",
        });
      },
      onError: () =>
        addMessage({
          children: "Something went wrong",
        }),
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <>
        <SimpleListItem>
          <Typography type="headline-6" style={{ margin: 0 }}>
            {place ? "Edit Place" : "New Place"}
          </Typography>
        </SimpleListItem>
        <SimpleListItem>
          <TextField
            id={useId()}
            readOnly
            dense
            className={styles.Field}
            value={position ? formatPosition(position) : ""}
            placeholder="Select point on map"
            rightChildren={<PlaceSVGIcon />}
            aria-label="Position"
          />
        </SimpleListItem>
        <SimpleListItem>
          <TextField
            id={useId()}
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
            dense
            className={styles.Field}
            maxLength={50}
            required
          />
        </SimpleListItem>
        <SimpleListItem>
          <TextArea
            id={useId()}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            dense
            rows={5}
            maxRows={10}
            className={styles.Field}
            maxLength={500}
          />
        </SimpleListItem>
        <ListSubheader>Links</ListSubheader>
        {links.map((link, index) => (
          <SimpleListItem key={index}>
            <TextField
              id={`${linkIdPrefix}-${index}`}
              dense
              className={styles.Field}
              value={link}
              required
              onChange={(e) =>
                setLinks((cur) =>
                  cur.map((url, curIndex) =>
                    curIndex === index ? e.target.value : url
                  )
                )
              }
              placeholder="https://"
              isRightAddon={false}
              type="url"
              rightChildren={
                <Button
                  buttonType="icon"
                  className={styles.RemoveButton}
                  onClick={() =>
                    setLinks((cur) => cur.filter((_, i) => i !== index))
                  }
                  aria-label="Remove link"
                >
                  <ClearSVGIcon />
                </Button>
              }
            />
          </SimpleListItem>
        ))}
        <SimpleListItem>
          <Button
            themeType="outline"
            onClick={() => setLinks((cur) => [...cur, ""])}
          >
            <TextIconSpacing icon={<AddSVGIcon />}>Add link</TextIconSpacing>
          </Button>
        </SimpleListItem>

        <SimpleListItem>
          <Button theme="primary" themeType="contained" type="submit">
            <TextIconSpacing icon={<SendSVGIcon />}>
              {place ? "Save place" : "Submit new place"}
            </TextIconSpacing>
          </Button>
        </SimpleListItem>

        {!place && (
          <SimpleListItem>
            <i>
              The submitted place will be manually reviewed before it becomes
              public.
            </i>
          </SimpleListItem>
        )}
      </>
    </form>
  );
}

const FORMAT = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 6,
  maximumFractionDigits: 6,
});

function formatPosition(point: LatLngTuple): string {
  return point.map((p) => FORMAT.format(p)).join(" / ");
}
