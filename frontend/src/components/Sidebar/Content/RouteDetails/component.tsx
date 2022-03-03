import { TextIconSpacing } from "@react-md/icon";
import { List, SimpleListItem } from "@react-md/list";
import { ListSVGIcon } from "@react-md/material-icons";
import { Typography } from "@react-md/typography";
import { Route } from "zwift-data";
import { LocationState } from "../../../../services/location-state";
import { ButtonState } from "../../../ButtonState";
import { RouteElevationChart } from "./RouteElevationChart";
import { RouteEvents } from "./RouteEvents";
import { RouteFacts } from "./RouteFacts";
import { RouteHelmet } from "./RouteHelmet";
import { RouteLinks } from "./RouteLinks";
import { RouteSegments } from "./RouteSegments";
import { RouteStravaPB } from "./RouteStravaPB";
import { RouteSurface } from "./RouteSurface";

interface Props {
  route: Route;
  backButtonText: string;
  backButtonState: LocationState;
}

export default function RouteDetails({
  route,
  backButtonText,
  backButtonState,
}: Props) {
  return (
    <>
      <List>
        <RouteHelmet route={route} />
        <SimpleListItem>
          <ButtonState themeType="outline" state={backButtonState}>
            <TextIconSpacing icon={<ListSVGIcon />}>
              {backButtonText}
            </TextIconSpacing>
          </ButtonState>
        </SimpleListItem>

        <SimpleListItem>
          <Typography type="headline-6" style={{ margin: 0 }}>
            {route.name}
          </Typography>
        </SimpleListItem>

        <RouteFacts route={route} />
        <RouteStravaPB route={route} />

        <RouteElevationChart route={route} />
      </List>

      <RouteSurface route={route} />
      <RouteEvents route={route} />
      <RouteSegments route={route} />
      <RouteLinks route={route} />
    </>
  );
}
