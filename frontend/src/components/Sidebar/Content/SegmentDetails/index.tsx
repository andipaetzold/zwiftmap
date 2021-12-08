import { TextIconSpacing } from "@react-md/icon";
import { List, SimpleListItem } from "@react-md/list";
import { ListSVGIcon } from "@react-md/material-icons";
import { Typography } from "@react-md/typography";
import { Helmet } from "react-helmet-async";
import { Segment } from "zwift-data";
import { LocationState } from "../../../../services/location-state";
import { HoverData } from "../../../../types";
import { ButtonState } from "../../../ButtonState";
import { SegmentElevationChart } from "./SegmentElevationChart";
import { SegmentFacts } from "./SegmentFacts";
import { SegmentLinks } from "./SegmentLinks";
import { SegmentRoutes } from "./SegmentRoutes";
import { SegmentStravaPB } from "./SegmentStravaPB";

interface Props {
  segment: Segment;
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
  backButtonText: string;
  backButtonState: LocationState;
  onHoverRoute: (data: HoverData) => void;
}

export function SegmentDetails({
  segment,
  backButtonState,
  backButtonText,
  onMouseHoverDistanceChange,
  onHoverRoute,
}: Props) {
  return (
    <List>
      <Helmet>
        <title>{segment.name}</title>
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
          {segment.name}
        </Typography>
      </SimpleListItem>

      <SegmentFacts segment={segment} />
      <SegmentStravaPB segment={segment} />
      <SegmentElevationChart
        segment={segment}
        onMouseHoverDistanceChange={onMouseHoverDistanceChange}
      />
      <SegmentRoutes segment={segment} onHoverRoute={onHoverRoute} />
      <SegmentLinks segment={segment} />
    </List>
  );
}
