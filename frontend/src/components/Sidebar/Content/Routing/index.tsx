import { TextIconSpacing } from "@react-md/icon";
import { List, SimpleListItem } from "@react-md/list";
import { ListSVGIcon } from "@react-md/material-icons";
import { Typography } from "@react-md/typography";
import { useAsync } from "react-async-hook";
import { LocationStateRouting } from "../../../../services/location-state";
import { worker } from "../../../../services/worker-client";
import { ButtonState } from "../../../ButtonState";
import { RoutingElevationChart } from "./RoutingElevationChart";
import { RoutingFacts } from "./RoutingFacts";

interface Props {
  state: LocationStateRouting;
}

export function Routing({ state }: Props) {
  const { result: stream } = useAsync(
    async () => {
      if (state.points.length < 2) {
        return;
      }

      return await worker.navigate(
        state.points[0],
        state.points[1],
        state.world.slug
      );
    },
    [state, state.world.slug],
    { setLoading: (state) => ({ ...state, loading: true }) }
  );

  return (
    <List>
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

      {stream && (
        <>
          <RoutingFacts stream={stream} />
          <RoutingElevationChart stream={stream} />
        </>
      )}
    </List>
  );
}
