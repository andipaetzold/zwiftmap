import c from "classnames";
import React, { useState } from "react";
import { useAsync } from "react-async-hook";
import styles from "./App.module.css";
import { ElevationChart } from "./ElevationChart";
import { useHash } from "./hooks/useHash";
import RouteMap from "./RouteMap";
import RouteSelector from "./RouteSelector";
import { getSegment } from "./SegmentRepository";
import { World } from "./types";

export default function App() {
  const [routeSlug, setRouteSlug] = useHash();
  const { result: segment } = useAsync(async () => {
    if (routeSlug === "") {
      return undefined;
    }

    return await getSegment(routeSlug);
  }, [routeSlug]);
  const [mouseHoverDistance, setMouseHoverDistance] = useState<
    number | undefined
  >(undefined);

  const [world, onWorldChange] = useState<World>("watopia" as World);

  return (
    <div
      className={c(styles.Wrapper, {
        [styles.routeSelected]: segment !== undefined,
      })}
    >
      <RouteSelector
        routeSlug={routeSlug}
        onChange={setRouteSlug}
        world={world}
        onWorldChange={onWorldChange}
      />
      <RouteMap
        segment={segment}
        mouseHoverDistance={mouseHoverDistance}
        world={world}
      />
      {segment && (
        <ElevationChart
          segment={segment}
          onMouseHoverDistanceChange={setMouseHoverDistance}
        />
      )}
    </div>
  );
}
