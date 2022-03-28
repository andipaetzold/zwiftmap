import create from "zustand";
import { persist } from "zustand/middleware";
import { Sport } from "zwift-data";
import { Overlay, Settings, Theme, Units } from "../types";

const DEFAULT_SETTINGS: Settings = {
  sport: "cycling",
  units: "metric",
  theme: "system",
  overlay: "segments",
};

const LOCAL_STORAGE_KEY = "settings-store";

interface SettingStore extends Settings {
  setSport(sport: Sport): void;
  setUnits(units: Units): void;
  setTheme(theme: Theme): void;
  setOverlay(overlay: Overlay): void;
}

export const useSettings = create<SettingStore>(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      setSport: (sport) => set(() => ({ sport })),
      setUnits: (units) => set(() => ({ units })),
      setTheme: (theme) => set(() => ({ theme })),
      setOverlay: (overlay) => set(() => ({ overlay })),
    }),
    { name: LOCAL_STORAGE_KEY }
  )
);
