import { create } from "zustand";
import { HoverState } from "../types";

interface Store {
  query: string;
  setQuery: (query: string) => void;
  hoverState: HoverState;
  setHoverState: (hoverState: HoverState) => void;
}

export const useStore = create<Store>((set) => ({
  query: "",
  setQuery: (query) => set(() => ({ query })),
  hoverState: undefined,
  setHoverState: (hoverData) => set(() => ({ hoverState: hoverData })),
}));
