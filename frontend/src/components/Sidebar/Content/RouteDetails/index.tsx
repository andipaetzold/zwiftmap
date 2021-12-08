import { TextIconSpacing } from "@react-md/icon";
import { List, SimpleListItem } from "@react-md/list";
import { ListSVGIcon } from "@react-md/material-icons";
import { Typography } from "@react-md/typography";
import { Helmet } from "react-helmet-async";
import { Route } from "zwift-data";
import { LocationState } from "../../../../services/location-state";
import { ButtonState } from "../../../ButtonState";
import { RouteElevationChart } from "./RouteElevationChart";
import { RouteEvents } from "./RouteEvents";
import { RouteFacts } from "./RouteFacts";
import { RouteLinks } from "./RouteLinks";
import { RouteSegments } from "./RouteSegments";
import { RouteStravaPB } from "./RouteStravaPB";

interface Props {
  route: Route;
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
  backButtonText: string;
  backButtonState: LocationState;
}

export function RouteDetails({
  route,
  onMouseHoverDistanceChange,
  backButtonText,
  backButtonState,
}: Props) {
  return (
    <>
      <List>
        <Helmet>
          <title>{route.name}</title>
        </Helmet>

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

        <RouteElevationChart
          route={route}
          onMouseHoverDistanceChange={onMouseHoverDistanceChange}
        />
      </List>

      <RouteEvents route={route} />
      <RouteSegments route={route} />
      <RouteLinks route={route} />
    </>
  );
}
