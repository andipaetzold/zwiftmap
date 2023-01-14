import { LayerGroup, LayersControl } from "react-leaflet";
import { World } from "zwift-data";
import { COLORS } from "../../../../constants";
import { useSettings } from "../../../../hooks/useSettings";
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

  return (
    <LayersControl.Overlay name="Places" checked>
      <LayerGroup>
        {places?.map((place, placeIndex) => (
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
