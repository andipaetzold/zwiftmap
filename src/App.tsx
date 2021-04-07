import React, { useState } from "react";
import RouteSelector from "./RouteSelector";
import styles from "./App.module.css";
import RouteMap from "./RouteMap";

export default function App() {
  const [routeId, setRouteId] = useState<number | undefined>();

  return (
    <div className={styles.Wrapper}>
      <RouteSelector routeId={routeId} onChange={setRouteId} />
      <RouteMap routeId={routeId} />
    </div>
  );
}
