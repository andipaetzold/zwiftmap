import { TextIconSpacing } from "@react-md/icon";
import { List, SimpleListItem } from "@react-md/list";
import {
  CloudQueueSVGIcon,
  ListSVGIcon,
  MapSVGIcon,
  SpaceBarSVGIcon,
} from "@react-md/material-icons";
import { Typography } from "@react-md/typography";
import { useWorldUserFog } from "../../../../react-query";
import { LocationStateFog } from "../../../../services/location-state";
import { ButtonState } from "../../../ButtonState";
import { Distance } from "../../../Distance";
import { LoadingSpinner } from "../../../Loading";

const percentFormat = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

interface Props {
  state: LocationStateFog;
}

/**
 * TODO: helmet
 */
export default function Fog({ state }: Props) {
  const { data } = useWorldUserFog(state.world.slug);

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
          Fog of Zwift
        </Typography>
      </SimpleListItem>
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
      </SimpleListItem>
    </List>
  );
}
