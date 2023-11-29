import { TextIconSpacing } from "@react-md/icon";
import { List, SimpleListItem } from "@react-md/list";
import { ListSVGIcon } from "@react-md/material-icons";
import { MenuItemSeparator } from "@react-md/menu";
import { Typography } from "@react-md/typography";
import { LatLngTuple } from "leaflet";
import { useWorkerNavigate } from "../../../../react-query";
import { LocationStateCustomRoute } from "../../../../services/location-state";
import { ButtonState } from "../../../ButtonState";
import { CustomRouteElevationChart } from "./CustomRouteElevationChart";
import { CustomRouteFacts } from "./CustomRouteFacts";
import { CustomRouteHelmet } from "./CustomRouteHelmet";
import { CustomRouteSharing } from "./CustomRouteSharing";
import { CustomRouteSurface } from "./CustomRouteSurface";
import { CustomRouteWaypoints } from "./CustomRouteWaypoints";
import { keepPreviousData } from "@tanstack/react-query";

interface Props {
  state: LocationStateCustomRoute;
}

export default function CustomRoute({ state }: Props) {
  const { data: stream } = useWorkerNavigate(
    {
      world: state.world.slug,
      points: state.points.filter((p): p is LatLngTuple => p !== null),
    },
    { placeholderData: keepPreviousData }
  );

  return (
    <List>
      <CustomRouteHelmet world={state.world} />
      <SimpleListItem>
        <ButtonState
          themeType="outline"
          query=""
          state={{
            world: state.world,
            type: "default",
          }}
        >
          <TextIconSpacing icon={<ListSVGIcon />}>Route List</TextIconSpacing>
        </ButtonState>
      </SimpleListItem>

      <SimpleListItem>
        <Typography type="headline-6" style={{ margin: 0 }}>
          Custom Route
        </Typography>
      </SimpleListItem>

      <CustomRouteWaypoints state={state} />

      {stream && (
        <>
          <MenuItemSeparator />
          <CustomRouteFacts stream={stream} />
          <CustomRouteElevationChart stream={stream} />
          <CustomRouteSurface state={state} latLngStream={stream} />
          <CustomRouteSharing state={state} latLngStream={stream} />
        </>
      )}
    </List>
  );
}
