import { ListItem } from "@react-md/list";
import { Route } from "../../types";

export interface Props {
  route: Route;
  onClick: () => void;
}

export function SearchResultCardRoute({ route, onClick }: Props) {
  return (
    <ListItem secondaryText={getRouteInfo(route)} onClick={onClick}>
      {route.name}
    </ListItem>
  );
}

function getRouteInfo(route: Route) {
  return `${route.distance}km | ${route.elevation}m`;
}
