import { LayerGroup, LayersControl } from "react-leaflet";
import { World } from "zwift-data";
import { COLORS } from "../../../../constants";
import { useWorldPlaces } from "../../../../react-query";
import { navigate } from "../../../../services/location-state";
import { PlaceMarker } from "../../../PlaceMarker";

interface Props {
  world: World;
}

export function OverlayPlaces({ world }: Props) {
  const { data: places } = useWorldPlaces(world.slug, true);

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
