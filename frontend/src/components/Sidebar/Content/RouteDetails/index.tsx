import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { List, SimpleListItem } from "@react-md/list";
import { ListFontIcon } from "@react-md/material-icons";
import { Text } from "@react-md/typography";
import { Route } from "zwift-data";
import { RouteElevationChart } from "../../../ElevationChart";
import { RouteEvents } from "./RouteEvents";
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
        <Text type="headline-6" style={{ margin: 0 }}>
          {route.name}
        </Text>
      </SimpleListItem>

      <RouteStravaPB route={route} />

      <SimpleListItem>
        <RouteElevationChart
          route={route}
          onMouseHoverDistanceChange={onMouseHoverDistanceChange}
        />
      </SimpleListItem>

      <RouteEvents route={route} />
      <RouteSegments route={route} />
      <RouteLinks route={route} />
    </List>
  );
}
