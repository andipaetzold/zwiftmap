import { TextIconSpacing } from "@react-md/icon";
import { List, SimpleListItem } from "@react-md/list";
import { ListSVGIcon } from "@react-md/material-icons";
import { MenuItemSeparator } from "@react-md/menu";
import { Typography } from "@react-md/typography";
import { LatLngTuple } from "leaflet";
import { range } from "lodash-es";
import { useAsync } from "react-async-hook";
import { LocationStateCustomRoute } from "../../../../services/location-state";
import { worker } from "../../../../services/worker-client";
import { LatLngAlt } from "../../../../types";
import { ButtonState } from "../../../ButtonState";
import { CustomRouteElevationChart } from "./CustomRouteElevationChart";
import { CustomRouteFacts } from "./CustomRouteFacts";
import { CustomRouteHelmet } from "./CustomRouteHelmet";
import { CustomRouteExport } from "./CustomRouteSharing";
import { CustomRouteSurface } from "./CustomRouteSurface";
import { CustomRouteWaypoints } from "./CustomRouteWaypoints";

interface Props {
  state: LocationStateCustomRoute;
}

export default function CustomRoute({ state }: Props) {
  const { result: stream } = useAsync(
    async () => {
      const noNullPoints = state.points.filter(
        (p): p is LatLngTuple => p !== null
      );

      if (noNullPoints.length < 2) {
        return;
      }

      const routes = await Promise.all(
        range(0, noNullPoints.length - 1).map((index) =>
          worker.navigate(
            noNullPoints[index],
            noNullPoints[index + 1],
            state.world.slug
          )
        )
      );

      return ([] as LatLngAlt[]).concat.apply([], routes);
    },
    [state, state.world.slug],
    { setLoading: (state) => ({ ...state, loading: true }) }
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
          <CustomRouteExport state={state} latLngStream={stream} />
        </>
      )}
    </List>
  );
}
