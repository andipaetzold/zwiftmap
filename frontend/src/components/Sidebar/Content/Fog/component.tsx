import { TextIconSpacing } from "@react-md/icon";
import { List, SimpleListItem } from "@react-md/list";
import { ListSVGIcon, MapSVGIcon } from "@react-md/material-icons";
import { Typography } from "@react-md/typography";
import { LocationStateFog } from "../../../../services/location-state";
import { ButtonState } from "../../../ButtonState";

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
          Fog of Zwift (Beta)
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
