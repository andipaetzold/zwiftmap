import { ListItem } from "@react-md/list";
import { routes, segments, World } from "zwift-data";
import {
  LocationStateDefault,
  useLocationState,
} from "../../../../../services/location-state";
import { useSettings } from "../../../../../hooks/useSettings";
import { useStore } from "../../../../../hooks/useStore";

export interface Props {
  world: World;
}

export function ListItemWorld({ world }: Props) {
  const [, setLocationState] = useLocationState<LocationStateDefault>();
  const setQuery = useStore((state) => state.setQuery);

  const [settings] = useSettings();
  const secondaryText = `${
    routes
      .filter((r) => r.sports.includes(settings.sport))
      .filter((r) => r.world === world.slug).length
  } routes | ${segments.filter((s) => s.world === world.slug).length} segments`;

  const handleClick = () => {
    setQuery("");
    setLocationState({
      world,
      type: "default",
    });
  };

  return (
    <ListItem secondaryText={secondaryText} onClick={handleClick}>
      {world.name}
    </ListItem>
  );
}
