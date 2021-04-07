import React, { useState } from "react";
import RouteSelector from "./RouteSelector";
import styles from "./App.module.css";
import RouteMap from "./RouteMap";

export default function App() {
  const [routeKey, setRouteKey] = useState<string | undefined>();

  return (
    <div className={styles.Wrapper}>
      <RouteSelector routeKey={routeKey} onChange={setRouteKey} />
      <RouteMap routeKey={routeKey} />
    </div>
  );
}
