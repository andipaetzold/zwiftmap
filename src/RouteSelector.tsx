import c from "classnames";
import { ChangeEvent } from "react";
import { routes, worlds } from "./data";
import styles from "./RouteSelector.module.css";
import { Route, WorldSlug } from "./types";

export interface RouteSelection {
  world: WorldSlug;
  route?: Route;
}

interface Props {
  selection: RouteSelection;
  onChange: (route: RouteSelection) => void;
}
export default function RouteSelector({ selection, onChange }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const route = routes.find((r) => r.slug === e.target.value)!;
      onChange({ world: route.world, route });
    }
  };

  const filteredRoutes = routes
    .filter((route) => route.world === selection.world)
    .filter((route) => route.sport === "cycling")
    .filter((route) => route.stravaSegmentId !== undefined)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={styles.Container}>
      <div className={styles.Sidebar}>
        <select
          value={selection.world}
          onChange={(e) => onChange({ world: e.target.value as WorldSlug })}
        >
          {worlds.map((world) => (
            <option key={world.slug} value={world.slug}>{world.name}</option>
          ))}
        </select>

        {filteredRoutes.map((route) => (
          <label
            key={route.slug}
            className={c(styles.Item, {
              [styles.selected]: selection.route?.slug === route.slug,
            })}
          >
            <input
              type="radio"
              name="routes"
              value={route.slug}
              checked={selection.route?.slug === route.slug}
              onChange={handleChange}
            />
            {route.name}
          </label>
        ))}
      </div>
    </div>
  );
}
