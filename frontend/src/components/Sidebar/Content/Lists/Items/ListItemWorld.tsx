import { routes, segments, World } from "zwift-data";
import { useSettings } from "../../../../../hooks/useSettings";
import { ListItemState } from "../../../../ListItemState";

export interface Props {
  world: World;
}

export function ListItemWorld({ world }: Props) {
  const [settings] = useSettings();
  const secondaryText = `${
    routes
      .filter((r) => r.sports.includes(settings.sport))
      .filter((r) => r.world === world.slug).length
  } routes | ${segments.filter((s) => s.world === world.slug).length} segments`;

  return (
    <ListItemState
      secondaryText={secondaryText}
      state={{
        world,
        type: "default",
      }}
      query=""
    >
      {world.name}
    </ListItemState>
  );
}
