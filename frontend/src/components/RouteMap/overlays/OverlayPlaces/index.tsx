import { useId } from "react";
import { LayerGroup, LayersControl, Pane } from "react-leaflet";
import { World } from "zwift-data";
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
import { Z_INDEX } from "../../constants";

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

  const id = useId();

  if (["place-edit", "place-new"].includes(locationState.type)) {
    return null;
  }

  const placesToShow =
    query === "" ? places : results.place.map(({ data }) => data);

  const color = (
    ["default", "strava-activities", "event"] as LocationState["type"][]
  ).includes(locationState.type)
    ? COLORS.place
    : COLORS.previewRoute;

  return (
    <LayersControl.Overlay name="Places" checked>
      <LayerGroup>
        <Pane name={id} style={{ zIndex: Z_INDEX.places }}>
          {placesToShow?.map((place, placeIndex) => (
            <PlaceMarker
              key={placeIndex}
              position={place.position}
              fill={color}
              eventHandlers={{
                click: () =>
                  navigate({ type: "place", world, placeId: place.id }),
              }}
            />
          ))}
        </Pane>
      </LayerGroup>
    </LayersControl.Overlay>
  );
}
