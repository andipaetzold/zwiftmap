import React, { useState } from "react";
import styles from "./App.module.scss";
import RouteMap from "./components/RouteMap";
import { Sidebar } from "./components/Sidebar";
import { HoverData } from "./types";

export default function App() {
  const [mouseHoverDistance, setMouseHoverDistance] = useState<
    number | undefined
  >(undefined);

  const [previewRoute, setPreviewRoute] = useState<HoverData>();

  return (
    <div className={styles.Wrapper} role="presentation">
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
