import { LayerGroup, LayersControl } from "react-leaflet";
import { World } from "zwift-data";
import { COLORS } from "../../../../constants";
import { useSearch } from "../../../../hooks/useSearch";
import { useSessionSettings } from "../../../../hooks/useSessionSettings";
import { useSettings } from "../../../../hooks/useSettings";
import { useStore } from "../../../../hooks/useStore";
import { useAuthStatus, useWorldPlaces } from "../../../../react-query";
import {
  navigate,
  useLocationState,
} from "../../../../services/location-state";
import { PlaceMarker } from "../../../PlaceMarker";

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
    canViewUnverified ? (showUnverifiedPlaces ? undefined : true) : true
  );

  if (["place-edit", "place-new"].includes(locationState.type)) {
    return null;
  }

  const placesToShow =
    query === "" ? places : results.place.map(({ data }) => data);

  return (
    <LayersControl.Overlay name="Places" checked>
      <LayerGroup>
        {placesToShow?.map((place, placeIndex) => (
          <PlaceMarker
            key={placeIndex}
            position={place.position}
            fill={COLORS.place}
            eventHandlers={{
              click: () =>
                navigate({ type: "place", world, placeId: place.id }),
            }}
          />
        ))}
      </LayerGroup>
    </LayersControl.Overlay>
  );
}
