import { useId } from "react";
import { Pane } from "react-leaflet";
import { worlds } from "zwift-data";
import { COLORS } from "../../../../constants";
import { navigate } from "../../../../services/location-state";
import { Place } from "../../../../types";
import { PlaceMarker } from "../../../PlaceMarker";
import { Z_INDEX } from "../../constants";

interface Props {
  places: Place[];
  important: boolean;
}

export function PlacesPane({ places, important }: Props) {
  const opacity = important ? 1 : 0.75;

  return (
    <Pane
      key={String(important)}
      name={useId()}
      style={{ zIndex: Z_INDEX.places, opacity }}
    >
      {places.map((place, placeIndex) => (
        <PlaceMarker
          key={placeIndex}
          position={place.position}
          fill={place.verified ? COLORS.place : COLORS.previewRoute}
          eventHandlers={{
            click: () =>
              navigate({
                type: "place",
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                world: worlds.find((w) => w.slug === place.world)!,
                placeId: place.id,
              }),
          }}
        />
      ))}
    </Pane>
  );
}
