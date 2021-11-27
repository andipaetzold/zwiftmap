import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { List, ListSubheader, SimpleListItem } from "@react-md/list";
import { ListFontIcon } from "@react-md/material-icons";
import { Helmet } from "react-helmet-async";
import { useIsLoggedInStrava } from "../../../../../hooks/useIsLoggedInStrava";
import { useStore } from "../../../../../hooks/useStore";
import {
  LocationStateStravaActivities,
  useLocationState
} from "../../../../../services/location-state";
import { HoverData } from "../../../../../types";
import { ConnectToStravaListItem } from "../../../../ConnectToStravaListItem";
import { LoadingSpinnerListItem } from "../../../../Loading";
import { StravaActivitiesListComponent } from "./component";

interface Props {
  onHoverRoute: (data: HoverData) => void;
}

export function StravaActivitiesList({ onHoverRoute }: Props) {
  const isLoggedInStrava = useIsLoggedInStrava();

  if (isLoggedInStrava === null) {
    return (
      <List>
        <Header />
        <LoadingSpinnerListItem />
      </List>
    );
  }

  if (!isLoggedInStrava) {
    return (
      <List>
        <Header />
        <ConnectToStravaListItem />
      </List>
    );
  }

  return <StravaActivitiesListWithToken onHoverRoute={onHoverRoute} />;
}

function StravaActivitiesListWithToken({ onHoverRoute }: Props) {
  return (
    <List>
      <Header />

      <ListSubheader>Recent Strava Activities</ListSubheader>
      <StravaActivitiesListComponent onHoverRoute={onHoverRoute} />
    </List>
  );
}

function Header() {
  const setQuery = useStore((state) => state.setQuery);

  const [locationState, setLocationState] =
    useLocationState<LocationStateStravaActivities>();
  return (
    <>
      <Helmet>
        <title>Strava Activities</title>
      </Helmet>
      <SimpleListItem>
        <Button
          themeType="outline"
          onClick={() => {
            setQuery("");
            setLocationState({
              world: locationState.world,
              type: "default",
            });
          }}
        >
          <TextIconSpacing icon={<ListFontIcon />}>Route List</TextIconSpacing>
        </Button>
      </SimpleListItem>
    </>
  );
}
