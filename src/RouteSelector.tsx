import routes from "./routes.json";
import styles from "./RouteSelector.module.css";
import c from "classnames";
import { Route } from "./types";

const filteredRoutes: Route[] = ((routes as unknown) as Route[])
  .filter((route) => route.world === "Watopia")
  .filter((route) => route.sport === "cycling")
  .filter((route) => route.stravaSegmentId !== undefined)
  .sort((a, b) => a.name.localeCompare(b.name));

interface Props {
  routeSlug: string | undefined;
  onChange: (routeKey: string | undefined) => void;
}

export default function RouteSelector({
  routeSlug: selectedRouteSlug,
  onChange,
}: Props) {
  return (
    <div className={styles.Container}>
      <div className={styles.Sidebar}>
        {filteredRoutes.map((route) => (
          <button
            key={route.slug}
            className={c(styles.Item, {
              [styles.selected]: selectedRouteSlug === route.slug,
            })}
            onClick={() => onChange(route.slug)}
          >
            {route.name}
          </button>
        ))}
      </div>
    </div>
  );
}
