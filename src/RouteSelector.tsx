import routes from "./routes.json";
import styles from "./RouteSelector.module.css";
import c from "classnames";

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
      {routes
        .filter((route) => route.world === "Watopia")
        .sort((a, b) => a.route.localeCompare(b.route))
        .map((route) => (
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
  );
}
