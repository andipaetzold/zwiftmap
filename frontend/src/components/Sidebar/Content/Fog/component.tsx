import { List, SimpleListItem } from "@react-md/list";
import { MapSVGIcon } from "@react-md/material-icons";
import { Typography } from "@react-md/typography";
import { LocationStateFog } from "../../../../services/location-state";

interface Props {
  state: LocationStateFog;
}

/**
 * TODO: helmet
 */
export default function Fog({ state }: Props) {
  return (
    <List>
      <SimpleListItem>
        <Typography type="headline-6" style={{ margin: 0 }}>
          Fog of Zwift
        </Typography>
      </SimpleListItem>

      <SimpleListItem
        leftAddon={<MapSVGIcon />}
        aria-label={`World: ${state.world.name}`}
      >
        {state.world.name}
      </SimpleListItem>
    </List>
  );
}
