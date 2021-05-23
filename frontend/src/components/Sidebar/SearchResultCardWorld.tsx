import { ListItem } from "@react-md/list";
import { routes, segments } from "../../data";
import { useSettings } from "../../hooks/useSettings";
import { World } from "../../types";

export interface Props {
  world: World;
  onClick: () => void;
}

export function SearchResultCardWorld({ world, onClick }: Props) {
  const [settings] = useSettings();
  const secondaryText = `${
    routes
      .filter((r) => r.sports.includes(settings.sport))
      .filter((r) => r.world === world.slug).length
  } routes | ${segments.filter((s) => s.world === world.slug).length} segments`;

  return (
    <ListItem secondaryText={secondaryText} onClick={onClick}>
      {world.name}
    </ListItem>
  );
}
