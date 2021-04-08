import React, { useState } from "react";
import RouteSelector from "./RouteSelector";
import styles from "./App.module.css";
import RouteMap from "./RouteMap";
import { useAsync } from "react-async-hook";
import { getSegment } from "./SegmentRepository";
import { ElevationChart } from "./ElevationChart";
import c from "classnames";

export default function App() {
  const [routeSlug, setRouteSlug] = useState<string | undefined>();
  const { result: segment } = useAsync(async () => {
    if (!routeSlug) {
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
