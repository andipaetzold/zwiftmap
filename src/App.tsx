import React, { useState } from "react";
import styles from "./App.module.css";
import { Sidebar } from "./components/Sidebar";
import RouteMap from "./RouteMap";

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mouseHoverDistance, _setMouseHoverDistance] = useState<
    number | undefined
  >(undefined);

  return (
    <>
      <div className={styles.Wrapper}>
        <Sidebar />
        <RouteMap mouseHoverDistance={mouseHoverDistance} />
      </div>
    </>
  );
}
