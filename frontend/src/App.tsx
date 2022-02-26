import c from "classnames";
import styles from "./App.module.scss";
import RouteMap from "./components/RouteMap";
import { Sidebar } from "./components/Sidebar";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  useTheme();

  return (
    <div className={c(styles.Wrapper)} role="presentation">
      <Sidebar />
      <RouteMap />
    </div>
  );
}
