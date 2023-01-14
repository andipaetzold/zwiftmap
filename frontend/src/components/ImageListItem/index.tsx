import { SimpleListItem } from "@react-md/list";
import styles from "./styles.module.scss";

interface Props {
  src: string;
}

export function ImageListItem({ src }: Props) {
  return (
    <SimpleListItem className={styles.ListItem}>
      <img src={src} alt="" />
    </SimpleListItem>
  );
}
