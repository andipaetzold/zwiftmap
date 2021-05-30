import { ListItem } from "@react-md/list";
import { routes, segments } from "../../data";
import { useLocationState } from "../../hooks/useLocationState";
import { useSettings } from "../../hooks/useSettings";
import { World } from "../../types";

export interface Props {
  world: World;
}

export function ListItemWorld({ world }: Props) {
  const [, setLocationState] = useLocationState();

  const [settings] = useSettings();
  const secondaryText = `${
    routes
      .filter((r) => r.sports.includes(settings.sport))
      .filter((r) => r.world === world.slug).length
  } routes | ${segments.filter((s) => s.world === world.slug).length} segments`;

  const handleClick = () => {
    setLocationState({
      world,
      query: "",
      type: "default",
    });
  };

  return (
    <ListItem secondaryText={secondaryText} onClick={handleClick}>
      {world.name}
    </ListItem>
  );
}
