import c from "classnames";
import React, { useMemo, useState } from "react";
import styles from "./App.module.css";
import { routes, worlds } from "./data";
import { ElevationChart } from "./ElevationChart";
import { useHash } from "./hooks/useHash";
import RouteMap from "./RouteMap";
import RouteSelector, { RouteSelection } from "./RouteSelector";
import { WorldSlug } from "./types";

export default function App() {
  const [hash, setHash] = useHash();
  const routeSelection = useMemo<RouteSelection>(() => {
    if (worlds.map((world) => world.slug).includes(hash as any)) {
      return { world: hash as WorldSlug };
    } else if (routes.find((r) => r.slug === hash)) {
      const route = routes.find((r) => r.slug === hash)!;
      return {
        world: route.world,
        route,
      };
    }

    return { world: "watopia" as WorldSlug };
  }, [hash]);

  const handleRouteSelectionChange = (rs: RouteSelection) => {
    if (rs.route) {
      setHash(rs.route.slug);
    } else {
      setHash(rs.world);
    }
  };

  const [mouseHoverDistance, setMouseHoverDistance] = useState<
    number | undefined
  >(undefined);

  return (
    <div
      className={c(styles.Wrapper, {
        [styles.routeSelected]: routeSelection.route !== undefined,
      })}
    >
      <RouteSelector
        selection={routeSelection}
        onChange={handleRouteSelectionChange}
      />
      <RouteMap
        routeSelection={routeSelection}
        mouseHoverDistance={mouseHoverDistance}
      />
      {routeSelection.route && (
        <ElevationChart
          route={routeSelection.route}
          onMouseHoverDistanceChange={setMouseHoverDistance}
        />
      )}
    </div>
  );
}
