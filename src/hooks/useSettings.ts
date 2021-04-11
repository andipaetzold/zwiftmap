import { useCallback, useEffect, useState } from "react";
import { Settings } from "../types";

const LOCAL_STORAGE_KEY = "settings";

type Listener = (settings: Settings) => void;
const listeners: Listener[] = [];

function loadSettings(): Settings {
  try {
    const rawSettings = localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}";
    const settings: Partial<Settings> = JSON.parse(rawSettings);

    return {
      sport: settings.sport ?? "cycling",
    };
  } catch {
    return {
      sport: "cycling",
    };
  }
}

function saveSettings(settings: Settings) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
}

export function useSettings(): [Settings, (settings: Settings) => void] {
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    const listener: Listener = (newSettings) => setSettings(newSettings);
    listeners.push(listener);

    return () => {
      listeners.splice(listeners.indexOf(listener), 1);
    };
  }, [settings]);

  const updateSettings = useCallback((newSettings: Settings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
    listeners.forEach((listener) => listener(newSettings));
  }, []);

  return [settings, updateSettings];
}
