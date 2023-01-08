import { worlds } from "zwift-data";
import { Place } from "../../../../../types";
import { ListItemState } from "../../../../ListItemState";

export interface Props {
  place: Place;
}

export function ListItemPlace({ place }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const world = worlds.find((w) => w.slug === place.world)!;

  return (
    <ListItemState
      secondaryText={world.name}
      state={{
        type: "place",
        world: world,
        placeId: place.id,
      }}
      query=""
    >
      {place.name}
    </ListItemState>
  );
}
