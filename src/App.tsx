import c from "classnames";
import React, { useCallback, useMemo, useState } from "react";
import styles from "./App.module.css";
import { Sidebar } from "./components/Sidebar";
import { routes, worlds } from "./data";
import { useHash } from "./hooks/useHash";
import RouteMap from "./RouteMap";
import { RouteSelection, WorldSlug } from "./types";

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

  const handleRouteSelectionChange = useCallback(
    (rs: RouteSelection) => {
      if (rs.route) {
        setHash(rs.route.slug);
      } else {
        setHash(rs.world);
      }
    },
    [setHash]
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mouseHoverDistance, _setMouseHoverDistance] = useState<
    number | undefined
  >(undefined);

  return (
    <>
      <div
        className={c(styles.Wrapper, {
          [styles.routeSelected]: routeSelection.route !== undefined,
        })}
      >
        <Sidebar
          selection={routeSelection}
          onChange={handleRouteSelectionChange}
        />
        <RouteMap
          routeSelection={routeSelection}
          mouseHoverDistance={mouseHoverDistance}
        />
      </div>
    </>
  );
}
