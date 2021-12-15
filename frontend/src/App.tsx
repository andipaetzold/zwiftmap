import c from "classnames";
import React, { useState } from "react";
import styles from "./App.module.scss";
import RouteMap from "./components/RouteMap";
import { Sidebar } from "./components/Sidebar";
import { useTheme } from "./hooks/useTheme";
import { HoverData } from "./types";

export default function App() {
  const [mouseHoverDistance, setMouseHoverDistance] = useState<
    number | undefined
  >(undefined);

  const [previewRoute, setPreviewRoute] = useState<HoverData>();
  useTheme();

  return (
    <div
      className={c(styles.Wrapper)}
      role="presentation"
    >
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
