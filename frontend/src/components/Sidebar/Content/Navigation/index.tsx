import { List, SimpleListItem } from "@react-md/list";
import { Typography } from "@react-md/typography";
import { useAsync } from "react-async-hook";
import { LocationStateNavigation } from "../../../../services/location-state";
import { worker } from "../../../../services/worker-client";
import { NavigationElevationChart } from "./NavigationElevationChart";
import { NavigationFacts } from "./NavigationFacts";

interface Props {
  state: LocationStateNavigation;
}

export function Navigation({ state }: Props) {
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
        <Typography type="headline-6" style={{ margin: 0 }}>
          Navigation
        </Typography>
      </SimpleListItem>

      {stream && (
        <>
          <NavigationFacts stream={stream} />
          <NavigationElevationChart stream={stream} />
        </>
      )}
    </List>
  );
}
