import { TextIconSpacing } from "@react-md/icon";
import { List, SimpleListItem } from "@react-md/list";
import { ListSVGIcon } from "@react-md/material-icons";
import { MenuItemSeparator } from "@react-md/menu";
import { Typography } from "@react-md/typography";
import { LatLngTuple } from "leaflet";
import { range } from "lodash-es";
import { useAsync } from "react-async-hook";
import { LocationStateRouting } from "../../../../services/location-state";
import { worker } from "../../../../services/worker-client";
import { LatLngAlt } from "../../../../types";
import { ButtonState } from "../../../ButtonState";
import { RoutingElevationChart } from "./RoutingElevationChart";
import { RoutingFacts } from "./RoutingFacts";
import { RoutingHelmet } from "./RoutingHelmet";
import { RoutingWaypoints } from "./RoutingWaypoints";

interface Props {
  state: LocationStateRouting;
}

export function Routing({ state }: Props) {
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
      <RoutingHelmet world={state.world} />
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
          Routing
        </Typography>
      </SimpleListItem>

      <RoutingWaypoints state={state} />

      {stream && (
        <>
          <MenuItemSeparator />
          <RoutingFacts stream={stream} />
          <RoutingElevationChart stream={stream} />
        </>
      )}
    </List>
  );
}
