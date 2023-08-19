import { LayerGroup, LayersControl } from "react-leaflet";
import { World, worlds } from "zwift-data";
import { COLORS } from "../../../../constants";
import { useSearch } from "../../../../hooks/useSearch";
import { useSettings } from "../../../../hooks/useSettings";
import { useStore } from "../../../../hooks/useStore";
import { useAuthStatus, useWorldPlaces } from "../../../../react-query";
import {
  LocationState,
  navigate,
  useLocationState,
} from "../../../../services/location-state";
import { PlaceMarker } from "../../../PlaceMarker";
import { PlacesPane } from "./PlacesPane";

interface Props {
  world: World;
}

export function OverlayPlaces({ world }: Props) {
  const sport = useSettings((state) => state.sport);
  const query = useStore((store) => store.query);
  const results = useSearch(query, sport);

  const locationState = useLocationState();
  const showUnverifiedPlaces = useSettings((s) => s.showUnverifiedPlaces);
  const { data: authStatus } = useAuthStatus();
  const canViewUnverified =
    (authStatus?.adminUser ?? false) || (authStatus?.moderatorUser ?? false);

  const { data: places } = useWorldPlaces(
    world.slug,
    canViewUnverified ? (showUnverifiedPlaces ? undefined : true) : true,
  );

  if (["place-edit", "place-new"].includes(locationState.type)) {
    return null;
  }

  const currentPlace = places?.find(
    (p) => locationState.type === "place" && p.id === locationState.placeId,
  );

  const placesToShow =
    query === "" ? places : results.place.map(({ data }) => data);

  const important = (
    ["default", "strava-activities", "events"] as LocationState["type"][]
  ).includes(locationState.type);

  return (
    <LayersControl.Overlay name="Places" checked>
      <LayerGroup>
        {placesToShow && (
          <PlacesPane
            important={important}
            places={placesToShow.filter((p) => p.id !== currentPlace?.id)}
          />
        )}
        {currentPlace && (
          <PlaceMarker
            position={currentPlace.position}
            fill={COLORS.place}
            eventHandlers={{
              click: () =>
                navigate({
                  type: "place",
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  world: worlds.find((w) => w.slug === currentPlace.world)!,
                  placeId: currentPlace.id,
                }),
            }}
          />
        )}
      </LayerGroup>
    </LayersControl.Overlay>
  );
}
