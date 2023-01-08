import { useAddMessage } from "@react-md/alert";
import { Button } from "@react-md/button";
import { TextArea, TextField } from "@react-md/form";
import { TextIconSpacing } from "@react-md/icon";
import { List, ListSubheader, SimpleListItem } from "@react-md/list";
import {
  AddSVGIcon,
  ClearSVGIcon,
  ListSVGIcon,
  PlaceSVGIcon,
  SendSVGIcon,
} from "@react-md/material-icons";
import { Typography } from "@react-md/typography";
import { useMutation } from "@tanstack/react-query";
import { LatLngTuple } from "leaflet";
import { FormEvent, useEffect, useId, useState } from "react";
import { emitter } from "../../../../services/emitter";
import { LocationStatePlaceNew } from "../../../../services/location-state";
import { createPlace } from "../../../../services/zwiftMapApi";
import { ButtonState } from "../../../ButtonState";
import { PlaceNewHelmet } from "./PlaceNewHelment";
import styles from "./styles.module.scss";

interface Props {
  state: LocationStatePlaceNew;
}

export default function PlaceNew({ state }: Props) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState<LatLngTuple | null>(null);
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState<string[]>([]);
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

      await createPlace({
        name,
        description,
        links,
        world: state.world.slug,
        // We have form validation
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        position: position!,
      });
    },
    {
      onSuccess: () => {
        setPosition(null);
        setName("");
        setDescription("");
        setLinks([]);
        addMessage({
          children: "New place was submitted successfully",
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
      <List>
        <PlaceNewHelmet />
        <SimpleListItem>
          <ButtonState
            themeType="outline"
            query=""
            state={{
              world: state.world,
              type: "default",
            }}
          >
            <TextIconSpacing icon={<ListSVGIcon />}>Route List</TextIconSpacing>
          </ButtonState>
        </SimpleListItem>
        <SimpleListItem>
          <Typography type="headline-6" style={{ margin: 0 }}>
            New Place
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
              Submit new place
            </TextIconSpacing>
          </Button>
        </SimpleListItem>

        <SimpleListItem>
          <i>
            The submitted place will be manually reviewed before it becomes
            public.
          </i>
        </SimpleListItem>
      </List>
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
