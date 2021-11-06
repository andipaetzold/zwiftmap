import React, { useState } from "react";
import styles from "./App.module.scss";
import RouteMap from "./components/RouteMap";
import { Sidebar } from "./components/Sidebar";
import { usePing } from "./hooks/usePing";

export default function App() {
  usePing();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mouseHoverDistance, setMouseHoverDistance] =
    useState<number | undefined>(undefined);

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
