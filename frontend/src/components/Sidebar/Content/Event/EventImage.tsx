import { SimpleListItem } from "@react-md/list";
import { ZwiftEvent } from "../../../../types";
import styles from "./EventImage.module.scss";

interface Props {
  event: ZwiftEvent;
}

export function EventImage({ event }: Props) {
  return (
    <SimpleListItem className={styles.ListItem}>
      <img src={event.imageUrl} alt="" className={styles.Image} />
    </SimpleListItem>
  );
}
