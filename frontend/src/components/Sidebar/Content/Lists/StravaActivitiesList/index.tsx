import { Avatar } from "@react-md/avatar";
import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import {
  List,
  ListItemLink,
  ListItemText,
  ListSubheader,
  SimpleListItem,
} from "@react-md/list";
import { ListFontIcon, OpenInNewFontIcon } from "@react-md/material-icons";
import stravaLogo from "../../../../../assets/strava-40x40.png";
import { useIsLoggedInStrava } from "../../../../../hooks/useIsLoggedInStrava";
import {
  LocationStateStravaActivities,
  useLocationState,
} from "../../../../../services/location-state";
import { useStravaAuthUrl } from "../../../../../services/strava/auth";
import { HoverData } from "../../../../../types";
import { LoadingSpinnerListItem } from "../../../../Loading";
import { StravaActivitiesListComponent } from "./component";

interface Props {
  onHoverRoute: (data: HoverData) => void;
}

export function StravaActivitiesList({ onHoverRoute }: Props) {
  const isLoggedInStrava = useIsLoggedInStrava();
  const stravaAuthUrl = useStravaAuthUrl();

  const [locationState, setLocationState] =
    useLocationState<LocationStateStravaActivities>();

  const backButton = (
    <SimpleListItem>
      <Button
        themeType="outline"
        onClick={() => {
          setLocationState({
            world: locationState.world,
            query: "",
            type: "default",
          });
        }}
      >
        <TextIconSpacing icon={<ListFontIcon />}>Route List</TextIconSpacing>
      </Button>
    </SimpleListItem>
  );

  if (isLoggedInStrava === null) {
    return (
      <List>
        {backButton}
        <LoadingSpinnerListItem />
      </List>
    );
  }

  if (!isLoggedInStrava) {
    return (
      <List>
        {backButton}
        <ListItemLink
          leftAddon={
            <Avatar color="#ff6b00">
              <img src={stravaLogo} alt="" />
            </Avatar>
          }
          leftAddonType="avatar"
          rightAddon={<OpenInNewFontIcon />}
          rightAddonType="icon"
          href={stravaAuthUrl}
        >
          <ListItemText secondaryText="…to view Strava activities">
            Authorize Strava App…
          </ListItemText>
        </ListItemLink>
      </List>
    );
  }

  return <StravaActivitiesListWithToken onHoverRoute={onHoverRoute} />;
}

function StravaActivitiesListWithToken({ onHoverRoute }: Props) {
  const [locationState, setLocationState] =
    useLocationState<LocationStateStravaActivities>();

  return (
    <List>
      <SimpleListItem>
        <Button
          themeType="outline"
          onClick={() => {
            setLocationState({
              world: locationState.world,
              query: "",
              type: "default",
            });
          }}
        >
          <TextIconSpacing icon={<ListFontIcon />}>Route List</TextIconSpacing>
        </Button>
      </SimpleListItem>

      <ListSubheader>Recent Strava Activities</ListSubheader>
      <StravaActivitiesListComponent onHoverRoute={onHoverRoute} />
    </List>
  );
}
