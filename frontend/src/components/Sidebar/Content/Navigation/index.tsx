import { List, SimpleListItem } from "@react-md/list";
import { Typography } from "@react-md/typography";

export function Navigation() {
  return (
    <List>
      <SimpleListItem>
        <Typography type="headline-6" style={{ margin: 0 }}>
          Navigation
        </Typography>
      </SimpleListItem>
    </List>
  );
}
