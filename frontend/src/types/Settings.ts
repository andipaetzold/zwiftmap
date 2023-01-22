import { Sport } from "zwift-data";
import { ZwiftEventType } from "./ZwiftEvent";

export interface Settings {
  sport: Sport;
  units: Units;
  theme: Theme | "system";
  overlay: Overlay;
  showUnverifiedPlaces: boolean;
}

export type Theme = "light" | "dark";

export type Units = "imperial" | "metric";

export interface SessionSettings {
  sortState: SortState;
  eventFilter: EventFilterState;
}

export type SortKey =
  | "name"
  | "distance"
  | "elevation"
  | "experience"
  | "leadInDistance"
  | "leadInElevation";
export type SortDir = "ASC" | "DESC";

export interface SortState {
  key: SortKey;
  dir: SortDir;
}

export interface EventFilterState {
  eventTypes: ZwiftEventType[];
  requireCategoryEnforcement: boolean;
}

export type Overlay = "none" | "segments" | "surfaces";
