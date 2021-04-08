import c from "classnames";
import React from "react";
import { useAsync } from "react-async-hook";
import styles from "./App.module.css";
import { ElevationChart } from "./ElevationChart";
import { useHash } from "./hooks/useHash";
import RouteMap from "./RouteMap";
import RouteSelector from "./RouteSelector";
import { getSegment } from "./SegmentRepository";

export default function App() {
  const [routeSlug, setRouteSlug] = useHash();
  const { result: segment } = useAsync(async () => {
    if (routeSlug === "") {
      return undefined;
    }

    return await getSegment(routeSlug);
  }, [routeSlug]);

  return (
    <div
      className={c(styles.Wrapper, {
        [styles.routeSelected]: segment !== undefined,
      })}
    >
      <RouteSelector routeSlug={routeSlug} onChange={setRouteSlug} />
      <RouteMap segment={segment} />
      {segment && <ElevationChart segment={segment} />}
    </div>
  );
}
