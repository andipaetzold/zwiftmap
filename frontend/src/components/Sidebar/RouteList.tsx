import { routes } from "../../data";
import { useLocationState } from "../../hooks/useLocationState";
import { useSettings } from "../../hooks/useSettings";
import { ListItemRoute } from "./ListItemRoute";

interface Props {
  onHoverRoute: (route?: string) => void;
}

export function RouteList({ onHoverRoute }: Props) {
  const [settings] = useSettings();
  const [locationState] = useLocationState();

  return (
    <>
      {routes
        .filter((route) => route.world === locationState.world.slug)
        .filter((route) => route.sports.includes(settings.sport))
        .filter((route) => route.stravaSegmentId !== undefined)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((route) => (
          <ListItemRoute
            route={route}
            key={route.slug}
            onHoverRoute={onHoverRoute}
            showWorldName={false}
          />
        ))}
    </>
  );
}
