import routes from "./routes.json";
import styles from "./RouteSelector.module.css";
import c from "classnames";

interface Props {
  routeKey: string | undefined;
  onChange: (routeKey: string | undefined) => void;
}

export default function RouteSelector({
  routeKey: selectedRouteKey,
  onChange,
}: Props) {
  return (
    <div className={styles.Container}>
      {Object.entries(routes).map(([routeKey, route]) => (
        <button
          key={routeKey}
          className={c(styles.Item, {
            [styles.selected]: selectedRouteKey === routeKey,
          })}
          onClick={() => onChange(routeKey)}
        >
          {route.name}
        </button>
      ))}
    </div>
  );
}
