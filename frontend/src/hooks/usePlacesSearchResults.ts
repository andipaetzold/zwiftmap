import { useMemo } from "react";
import { useAuthStatus, usePlaces } from "../react-query";
import { SearchResultPlace } from "./useSearch";
import { useSettings } from "./useSettings";

export function usePlacesSearchResults(): SearchResultPlace[] {
  const showUnverifiedPlaces = useSettings((s) => s.showUnverifiedPlaces);
  const { data: authStatus } = useAuthStatus();
  const canViewUnverified =
    (authStatus?.adminUser ?? false) || (authStatus?.moderatorUser ?? false);

  const { data: places } = usePlaces(
    canViewUnverified ? (showUnverifiedPlaces ? undefined : true) : true
  );

  return useMemo(() => {
    if (!places) {
      return [];
    }

    return places.map((place) => ({
      type: "place",
      terms: [place.name].map((t) => t.toLowerCase()),
      data: place,
    }));
  }, [places]);
}
