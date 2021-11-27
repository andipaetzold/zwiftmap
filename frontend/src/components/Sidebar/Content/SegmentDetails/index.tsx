import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { List, SimpleListItem } from "@react-md/list";
import { ListFontIcon } from "@react-md/material-icons";
import { Typography } from "@react-md/typography";
import { Segment } from "zwift-data";
import { SegmentElevationChart } from "./SegmentElevationChart";
import { SegmentFacts } from "./SegmentFacts";
import { SegmentLinks } from "./SegmentLinks";
import { SegmentStravaPB } from "./SegmentStravaPB";

interface Props {
  segment: Segment;
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
  backButtonText: string;
  onBackButtonClick: () => void;
}

export function SegmentDetails({
  segment,
  onBackButtonClick,
  backButtonText,
  onMouseHoverDistanceChange,
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
          {segment.name}
        </Typography>
      </SimpleListItem>

      <SegmentFacts segment={segment} />
      <SegmentStravaPB segment={segment} />
      <SegmentElevationChart
        segment={segment}
        onMouseHoverDistanceChange={onMouseHoverDistanceChange}
      />
      <SegmentLinks segment={segment} />
    </List>
  );
}
