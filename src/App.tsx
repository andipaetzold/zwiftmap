import React, { useState } from "react";
import RouteSelector from "./RouteSelector";
import styles from "./App.module.css";
import RouteMap from "./RouteMap";

export default function App() {
  const [routeSlug, setRouteSlug] = useState<string | undefined>();

  return (
    <div className={styles.Wrapper}>
      <RouteSelector routeSlug={routeSlug} onChange={setRouteSlug} />
      <RouteMap routeSlug={routeSlug} />
    </div>
  );
}
