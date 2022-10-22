import { List, SimpleListItem } from "@react-md/list";
import {
  CloudQueueSVGIcon,
  MapSVGIcon,
  SpaceBarSVGIcon,
} from "@react-md/material-icons";
import { useStravaFogStats } from "../../../../react-query";
import { LocationStateFog } from "../../../../services/location-state";
import { Distance } from "../../../Distance";
import { LoadingSpinner } from "../../../Loading";
import { EnableActivityPersistence } from "./EnableActivityPersistence";
import { Info } from "./Info";
import { Sharing } from "./Sharing";

const percentFormat = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

interface Props {
  state: LocationStateFog;
}

export function FogComponent({ state }: Props) {
  const { data } = useStravaFogStats(state.world.slug);

  return (
    <List>
      <SimpleListItem leftAddon={<CloudQueueSVGIcon />}>
        {data !== undefined ? (
          <>
            <Distance
              label="Distance unlocked"
              distance={data.unlockedDistance / 1_000}
            />
            &nbsp;(
            {percentFormat.format(data.unlockedDistance / data.worldDistance)})
          </>
        ) : (
          <LoadingSpinner small />
        )}
      </SimpleListItem>
      <SimpleListItem leftAddon={<SpaceBarSVGIcon />}>
        {data !== undefined ? (
          <>
            <Distance
              label="Distance of all activities"
              distance={data.activityDistance / 1_000}
            />
            &nbsp;(
            {data.activityCount === 1
              ? "1 activity"
              : `${data.activityCount} activities`}
            )
          </>
        ) : (
          <LoadingSpinner small />
        )}
      </SimpleListItem>
      <SimpleListItem
        leftAddon={<MapSVGIcon />}
        aria-label={`World: ${state.world.name}`}
      >
        {state.world.name}
        {data !== undefined && (
          <>
            &nbsp;(
            <Distance
              label={`Available roads in ${state.world.name}`}
              distance={data.worldDistance / 1_000}
            />
            )
          </>
        )}
      </SimpleListItem>
      <Sharing state={state} />
      <Info />
      <EnableActivityPersistence />
    </List>
  );
}
