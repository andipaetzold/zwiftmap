import { useAddMessage } from "@react-md/alert";
import { Button } from "@react-md/button";
import { Divider } from "@react-md/divider";
import { TextArea, TextField } from "@react-md/form";
import { TextIconSpacing } from "@react-md/icon";
import { ListItem, ListSubheader, SimpleListItem } from "@react-md/list";
import {
  AddSVGIcon,
  ClearSVGIcon,
  PlaceSVGIcon,
  SendSVGIcon,
} from "@react-md/material-icons";
import { Typography } from "@react-md/typography";
import { useMutation } from "@tanstack/react-query";
import { LatLngTuple } from "leaflet";
import { useEffect, useId, useState } from "react";
import { World } from "zwift-data";
import { emitter } from "../../services/emitter";
import {
  createPlace,
  updatePlace,
  uploadFile,
} from "../../services/zwiftMapApi";
import { Place } from "../../types";
import styles from "./styles.module.scss";
import { UploadImage } from "./UploadImage";

interface Props {
  world: World;
  place?: Place;
}

export function PlaceEditForm({ place, world }: Props) {
  const [data, setData] = useState({
    name: place?.name ?? "",
    description: place?.description ?? "",
    position: place?.position ?? null,
    image: null as File | null,
    links: place?.links ?? [],
  });
  const addMessage = useAddMessage();

  const linkIdPrefix = useId();

  useEffect(() => {
    const listener = (pos: LatLngTuple) =>
      setData((cur) => ({ ...cur, position: pos }));
    emitter.on("placeMarkerMove", listener);
    return () => emitter.off("placeMarkerMove", listener);
  }, []);

  const { mutate: handleSubmit, isError } = useMutation(
    async () => {
      if (data.name.trim().length === 0 || data.position === null) {
        throw new Error("Validation error");
      }
      if (place) {
        let imageObjectId: string | undefined;
        if (data.image) {
          imageObjectId = await uploadFile(data.image);
        }

        await updatePlace({
          ...place,
          name: data.name,
          description: data.description,
          links: data.links,
          world: world.slug,
          // We have form validation
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          position: data.position!,
          imageObjectId,
        });
      } else {
        if (data.image === null) {
          throw new Error("Validation error");
        }

        const imageObjectId = await uploadFile(data.image);
        await createPlace({
          name: data.name,
          description: data.description,
          links: data.links,
          world: world.slug,
          // We have form validation
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          position: data.position!,
          imageObjectId,
        });
      }
    },
    {
      onSuccess: () => {
        if (place) {
          addMessage({
            children: "Place was updated",
          });
        } else {
          setData({
            name: "",
            description: "",
            image: null,
            position: null,
            links: [],
          });
          addMessage({
            children: "New place was submitted successfully",
          });
        }
      },
      onError: () =>
        addMessage({
          children: "Something went wrong",
        }),
    }
  );

  return (
    <form>
      <>
        <SimpleListItem>
          <Typography type="headline-6" style={{ margin: 0 }}>
            {place ? "Edit Place" : "New Place"}
          </Typography>
        </SimpleListItem>

        <ListSubheader>Data</ListSubheader>
        <SimpleListItem>
          <TextField
            id={useId()}
            readOnly
            dense
            className={styles.Field}
            value={
              data.position
                ? formatPosition(data.position)
                : "Select point on map"
            }
            label="Position*"
            rightChildren={<PlaceSVGIcon />}
            aria-label="Position"
            error={isError && data.position === null}
          />
        </SimpleListItem>
        <SimpleListItem>
          <TextField
            id={useId()}
            value={data.name}
            onChange={(e) =>
              setData((cur) => ({ ...cur, name: e.target.value }))
            }
            label="Name*"
            dense
            className={styles.Field}
            maxLength={50}
            required
            error={isError && data.name.trim().length === 0}
          />
        </SimpleListItem>
        <SimpleListItem>
          <TextArea
            id={useId()}
            value={data.description}
            onChange={(e) =>
              setData((cur) => ({ ...cur, description: e.target.value }))
            }
            label="Description"
            dense
            rows={5}
            maxRows={10}
            className={styles.Field}
            maxLength={500}
          />
        </SimpleListItem>

        {place && (
          <SimpleListItem className={styles.ImageListItem}>
            <img src={place.image} alt="" className={styles.Image} />
          </SimpleListItem>
        )}

        <ListSubheader>Image*</ListSubheader>
        <UploadImage
          error={isError && data.image === null}
          image={data.image}
          onChange={(newImage) =>
            setData((cur) => ({ ...cur, image: newImage }))
          }
        />

        <ListSubheader>Links</ListSubheader>
        {data.links.map((link, index) => (
          <SimpleListItem key={index}>
            <TextField
              id={`${linkIdPrefix}-${index}`}
              dense
              className={styles.Field}
              value={link}
              required
              onChange={(e) =>
                setData((cur) => ({
                  ...cur,
                  links: cur.links.map((url, curIndex) =>
                    curIndex === index ? e.target.value : url
                  ),
                }))
              }
              placeholder="https://"
              isRightAddon={false}
              type="url"
              rightChildren={
                <Button
                  buttonType="icon"
                  className={styles.RemoveButton}
                  onClick={() =>
                    setData((cur) => ({
                      ...cur,
                      links: cur.links.filter((_, i) => i !== index),
                    }))
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
            onClick={() =>
              setData((cur) => ({ ...cur, links: [...cur.links, ""] }))
            }
          >
            <TextIconSpacing icon={<AddSVGIcon />}>Add link</TextIconSpacing>
          </Button>
        </SimpleListItem>

        <Divider />

        <ListItem
          leftAddonType="icon"
          leftAddon={<SendSVGIcon />}
          onClick={() => handleSubmit()}
        >
          {place ? "Save place" : "Submit new place"}
        </ListItem>

        <SimpleListItem>* Required field</SimpleListItem>
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
