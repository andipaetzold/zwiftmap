import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { List, SimpleListItem } from "@react-md/list";
import { ListFontIcon } from "@react-md/material-icons";
import { Typography } from "@react-md/typography";
import { Route } from "zwift-data";
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
  onBackButtonClick: () => void;
}

export function RouteDetails({
  route,
  onMouseHoverDistanceChange,
  backButtonText,
  onBackButtonClick,
}: Props) {
  return (
    <List>
      <SimpleListItem>
        <Button themeType="outline" onClick={onBackButtonClick}>
          <TextIconSpacing icon={<ListFontIcon />}>
            {backButtonText}
          </TextIconSpacing>
        </Button>
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

      <RouteEvents route={route} />
      <RouteSegments route={route} />
      <RouteLinks route={route} />
    </List>
  );
}
