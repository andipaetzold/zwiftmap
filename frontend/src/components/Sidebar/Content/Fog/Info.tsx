import { ListSubheader, SimpleListItem } from "@react-md/list";
import { Typography } from "@react-md/typography";

export function Info() {
  return (
    <>
      <ListSubheader>Missing activities?</ListSubheader>
      <SimpleListItem>
        <Typography type="body-2" style={{ marginBottom: 0, marginTop: 0 }}>
          The fog only includes activities that were ridden/run after you gave
          ZwiftMap permissions to save and process activities.
        </Typography>
      </SimpleListItem>
    </>
  );
}
