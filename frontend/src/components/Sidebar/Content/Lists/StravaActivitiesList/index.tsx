import { TextIconSpacing } from "@react-md/icon";
import { List, ListSubheader, SimpleListItem } from "@react-md/list";
import { ListSVGIcon } from "@react-md/material-icons";
import { Helmet } from "react-helmet-async";
import { useIsLoggedInStrava } from "../../../../../hooks/useIsLoggedInStrava";
import {
  DEFAULT_WORLD,
  LocationStateStravaActivities,
} from "../../../../../services/location-state";
import { ButtonState } from "../../../../ButtonState";
import { ConnectToStravaListItem } from "../../../../ConnectToStravaListItem";
import { LoadingSpinnerListItem } from "../../../../Loading";
import { StravaActivitiesListComponent } from "./component";

interface Props {
  state: LocationStateStravaActivities;
}

export function StravaActivitiesList({ state }: Props) {
  const isLoggedInStrava = useIsLoggedInStrava();

  if (isLoggedInStrava === null) {
    return (
      <List>
        <Header state={state} />
        <LoadingSpinnerListItem />
      </List>
    );
  }

  if (!isLoggedInStrava) {
    return (
      <List>
        <Header state={state} />
        <ConnectToStravaListItem />
      </List>
    );
  }

  return <StravaActivitiesListWithToken state={state} />;
}

function StravaActivitiesListWithToken({ state }: Props) {
  return (
    <List>
      <Header state={state} />

      <ListSubheader>Recent Strava Activities</ListSubheader>
      <StravaActivitiesListComponent state={state} />
    </List>
  );
}

interface HeaderProps {
  state: LocationStateStravaActivities;
}

function Header({ state }: HeaderProps) {
  return (
    <>
      <Helmet>
        <title>Strava Activities</title>
        <meta
          name="description"
          content="List of your Strava activities from the last 6 month"
        />

        <meta property="og:title" content={`Strava Activities - ZwiftMap`} />
        <meta
          property="og:description"
          content="List of your Strava activities from the last 6 months"
        />
      </Helmet>
      <SimpleListItem>
        <ButtonState
          themeType="outline"
          query=""
          state={{
            world: state.world ?? DEFAULT_WORLD,
            type: "default",
          }}
        >
          <TextIconSpacing icon={<ListSVGIcon />}>Route List</TextIconSpacing>
        </ButtonState>
      </SimpleListItem>
    </>
  );
}
