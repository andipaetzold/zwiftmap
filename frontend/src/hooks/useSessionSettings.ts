import { useCallback, useEffect, useState } from "react";
import { EventFilterState, SessionSettings, SortState } from "../types";

const SESSION_STORAGE_KEY = "settings";

type Listener = (settings: SessionSettings) => void;
const listeners: Listener[] = [];

const DEFAULT_EVENT_FILTER_STATE: EventFilterState = {
  eventTypes: ["GROUP_WORKOUT", "GROUP_RIDE", "RACE", "TIME_TRIAL"],
  requireCategoryEnforcement: false,
};

const DEFAULT_SORT_STATE: SortState = {
  key: "name",
  dir: "ASC",
};

function loadSettings(): SessionSettings {
  try {
    const rawSettings = sessionStorage.getItem(SESSION_STORAGE_KEY) ?? "{}";
    const settings: Partial<SessionSettings> = JSON.parse(rawSettings);

    return {
      eventFilter: settings.eventFilter ?? DEFAULT_EVENT_FILTER_STATE,
      sortState: settings.sortState ?? DEFAULT_SORT_STATE,
    };
  } catch {
    return {
      eventFilter: DEFAULT_EVENT_FILTER_STATE,
      sortState: DEFAULT_SORT_STATE,
    };
  }
}

function saveSettings(settings: SessionSettings) {
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(settings));
}

export function useSessionSettings(): [
  SessionSettings,
  (settings: SessionSettings) => void,
] {
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    const listener: Listener = (newSettings) => setSettings(newSettings);
    listeners.push(listener);

    return () => {
      listeners.splice(listeners.indexOf(listener), 1);
    };
  }, [settings]);

  const updateSettings = useCallback((newSettings: SessionSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
    listeners.forEach((listener) => listener(newSettings));
  }, []);

  return [settings, updateSettings];
}
