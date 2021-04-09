import routes from "./data/routes.json";
import styles from "./RouteSelector.module.css";
import { Route, World } from "./types";
import { ChangeEvent } from "react";
import c from "classnames";

interface Props {
  routeSlug: string | undefined;
  onChange: (routeKey: string) => void;

  world: World;
  onWorldChange: (world: World) => void;
}

export default function RouteSelector({
  routeSlug: selectedRouteSlug,
  onChange,

  world,
  onWorldChange,
}: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onChange(e.target.value);
    }
  };

  const filteredRoutes = ((routes as unknown) as Route[])
    .filter((route) => route.world === world)
    .filter((route) => route.sport === "cycling")
    .filter((route) => route.stravaSegmentId !== undefined)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={styles.Container}>
      <div className={styles.Sidebar}>
        <select
          value={world}
          onChange={(e) => onWorldChange(e.target.value as World)}
        >
          <option value="crit-city">Crit City</option>
          <option value="france">France</option>
          <option value="innsbruck">Innsbruck</option>
          <option value="london">London</option>
          <option value="new-york">New York</option>
          <option value="paris">Paris</option>
          <option value="richmond">Richmond</option>
          <option value="watopia">Watopia</option>
          <option value="yorkshire">Yorkshire</option>
        </select>

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
