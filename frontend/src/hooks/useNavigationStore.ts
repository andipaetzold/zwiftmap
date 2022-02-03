import { LatLngTuple } from "leaflet";
import create from "zustand";

interface NavigationStore {
  from: LatLngTuple | null;
  setFrom: (from: LatLngTuple | null) => void;

  to: LatLngTuple | null;
  setTo: (to: LatLngTuple | null) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  from: null,
  setFrom: (from) => set(() => ({ from })),

  to: null,
  setTo: (to) => set(() => ({ to })),
}));
