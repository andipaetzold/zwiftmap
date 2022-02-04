import create from "zustand";
import { persist } from "zustand/middleware";
import { Sport } from "zwift-data";
import { Overlay, Settings, Theme, Units } from "../types";

/**
 * @deprecated
 */
const LOCAL_STORAGE_KEY_LEGACY = "settings";
const LOCAL_STORAGE_KEY = "settings-store";

interface SettingStore extends Settings {
  setSport(sport: Sport): void;
  setUnits(units: Units): void;
  setTheme(theme: Theme): void;
  setOverlay(overlay: Overlay): void;
}

export const useSettings = create<SettingStore>(
  persist(
    (set) => {
      const legacySettings = loadLegacySettings();
      return {
        ...legacySettings,
        setSport: (sport) => set(() => ({ sport })),
        setUnits: (units) => set(() => ({ units })),
        setTheme: (theme) => set(() => ({ theme })),
        setOverlay: (overlay) => set(() => ({ overlay })),
      };
    },
    { name: LOCAL_STORAGE_KEY }
  )
);

/**
 * @deprecated
 */
function loadLegacySettings(): Settings {
  try {
    const rawSettings = localStorage.getItem(LOCAL_STORAGE_KEY_LEGACY) ?? "{}";
    localStorage.removeItem(LOCAL_STORAGE_KEY_LEGACY);
    const settings: Partial<Settings> = JSON.parse(rawSettings);

    return {
      sport: settings.sport ?? "cycling",
      units: settings.units ?? "metric",
      theme: settings.theme ?? "system",
      overlay: settings.overlay ?? "segments",
    };
  } catch {
    return {
      sport: "cycling",
      units: "metric",
      theme: "system",
      overlay: "segments",
    };
  }
}
