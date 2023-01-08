import { List, ListSubheader, SimpleListItem } from "@react-md/list";
import { useWorldPlaces } from "../../../../react-query";
import { LocationStateDefault } from "../../../../services/location-state";
import { ListItemState } from "../../../ListItemState";

interface Props {
  state: LocationStateDefault;
}

export function PlacesList({ state }: Props) {
  const { data: places } = useWorldPlaces(state.world.slug);

  if (!places) {
    return (
      <>
        <ListSubheader>Places</ListSubheader>
        {/* TODO: spinner */}
      </>
    );
  }

  if (places.length === 0) {
    return (
      <>
        <ListSubheader>Places</ListSubheader>
        <SimpleListItem>No places in {state.world.name}</SimpleListItem>
      </>
    );
  }

  return (
    <>
      <ListSubheader>Places</ListSubheader>
      <List
        style={{ paddingTop: 0 }}
        role="list"
        aria-label={`Places in ${state.world.name}`}
      >
        {places.map((place) => (
          <ListItemState
            key={place.id}
            role="listitem"
            state={{ type: "place", world: state.world, placeId: place.id }}
          >
            {place.name}
          </ListItemState>
        ))}
      </List>
    </>
  );
}
