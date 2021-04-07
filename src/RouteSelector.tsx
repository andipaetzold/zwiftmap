import routes from "./routes.json";
import styles from "./RouteSelector.module.css";
import c from "classnames";
import { Route } from "./types";

const filteredRoutes: Route[] = ((routes as unknown) as Route[])
  .filter((route) => route.world === "Watopia")
  .filter((route) => route.sport === "cycling")
  .filter((route) => route.stravaid > 1);

interface Props {
  routeId: number | undefined;
  onChange: (routeKey: number | undefined) => void;
}

export default function RouteSelector({
  routeId: selectedRouteId,
  onChange,
}: Props) {
  return (
    <div className={styles.Container}>
      <div className={styles.Sidebar}>
        {filteredRoutes.map((route) => (
          <button
            key={route.routeid}
            className={c(styles.Item, {
              [styles.selected]: selectedRouteId === route.routeid,
            })}
            onClick={() => onChange(route.routeid)}
          >
            {route.route}
          </button>
        ))}
      </div>
    </div>
  );
}
