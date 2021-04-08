import routes from "./data/routes.json";
import styles from "./RouteSelector.module.css";
import { Route } from "./types";
import { ChangeEvent } from "react";
import c from "classnames";

const filteredRoutes: Route[] = ((routes as unknown) as Route[])
  .filter((route) => route.world === "Watopia")
  .filter((route) => route.sport === "cycling")
  .filter((route) => route.stravaSegmentId !== undefined)
  .sort((a, b) => a.name.localeCompare(b.name));

interface Props {
  routeSlug: string | undefined;
  onChange: (routeKey: string) => void;
}

export default function RouteSelector({
  routeSlug: selectedRouteSlug,
  onChange,
}: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Sidebar}>
        {filteredRoutes.map((route) => (
          <label
            key={route.slug}
            className={c(styles.Item, {
              [styles.selected]: selectedRouteSlug === route.slug,
            })}
          >
            <input
              type="radio"
              name="routes"
              value={route.slug}
              checked={selectedRouteSlug === route.slug}
              onChange={handleChange}
            />
            {route.name}
          </label>
        ))}
      </div>
    </div>
  );
}
