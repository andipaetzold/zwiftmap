import { SimpleListItem } from "@react-md/list";
import { Place } from "../../../../types";
import styles from "./PlaceImage.module.scss";

interface Props {
  place: Place;
}

export function PlaceImage({ place }: Props) {
  return (
    <SimpleListItem className={styles.ImageListItem}>
      <img src={place.image} alt="" className={styles.Image} />
    </SimpleListItem>
  );
}
