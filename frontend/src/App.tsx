import React, { useState } from "react";
import styles from "./App.module.scss";
import { Sidebar } from "./components/Sidebar";
import RouteMap from "./components/RouteMap";

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mouseHoverDistance, setMouseHoverDistance] = useState<
    number | undefined
  >(undefined);

  const [previewRoute, setPreviewRoute] = useState<string | undefined>();

  return (
    <div className={styles.Wrapper}>
      <Sidebar
        onMouseHoverDistanceChange={setMouseHoverDistance}
        onHoverRoute={setPreviewRoute}
      />
      <RouteMap
        mouseHoverDistance={mouseHoverDistance}
        previewRoute={previewRoute}
      />
    </div>
  );
}
