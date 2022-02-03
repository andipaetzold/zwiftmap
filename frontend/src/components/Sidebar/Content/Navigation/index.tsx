import { List, SimpleListItem } from "@react-md/list";
import { Typography } from "@react-md/typography";
import { useAsync } from "react-async-hook";
import { useNavigationStore } from "../../../../hooks/useNavigationStore";
import { LocationStateNavigation } from "../../../../services/location-state";
import { worker } from "../../../../services/worker-client";
import { NavigationElevationChart } from "./NavigationElevationChart";
import { NavigationFacts } from "./NavigationFacts";

interface Props {
  state: LocationStateNavigation;
}

export function Navigation({ state }: Props) {
  const { from, to } = useNavigationStore();

  const { result: stream } = useAsync(
    async () => {
      if (from === null || to === null) {
        return;
      }

      return await worker.navigate(from, to, state.world.slug);
    },
    [from, to, state.world.slug],
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
