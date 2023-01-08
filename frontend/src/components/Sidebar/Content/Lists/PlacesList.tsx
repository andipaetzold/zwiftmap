import { List, ListSubheader } from "@react-md/list";
import { useWorldPlaces } from "../../../../react-query";
import { LocationStateDefault } from "../../../../services/location-state";
import { ListItemState } from "../../../ListItemState";

interface Props {
  state: LocationStateDefault;
}

export function PlacesList({ state }: Props) {
  const { data: places } = useWorldPlaces(state.world.slug);

  if (!places || places.length === 0) {
    return null;
  }

  // TODO: create place button

  return (
    <>
      <ListSubheader>Places</ListSubheader>
      <List
        style={{ paddingTop: 0 }}
        role="list"
        aria-label={`Places in ${state.world.name}`}
      >
        {places?.map((place) => (
          <ListItemState
            key={place.id}
            role="listitem"
            state={{ type: "default", world: state.world }} // TODO: link
          >
            {place.name}
          </ListItemState>
        ))}
      </List>
    </>
  );
}
