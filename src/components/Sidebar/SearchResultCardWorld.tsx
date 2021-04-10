import { ListItem } from "@react-md/list";
import { routes, segments } from "../../data";
import { World } from "../../types";

export interface Props {
  world: World;
  onClick: () => void;
}

export function SearchResultCardWorld({ world, onClick }: Props) {
  const secondaryText = `${
    routes.filter((r) => r.world === world.slug).length
  } routes | ${segments.filter((s) => s.world === world.slug).length} segments`;

  return (
    <ListItem secondaryText={secondaryText} onClick={onClick}>
      {world.name}
    </ListItem>
  );
}
