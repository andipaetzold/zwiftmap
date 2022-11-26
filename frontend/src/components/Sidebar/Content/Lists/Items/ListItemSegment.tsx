import { useRef } from "react";
import { Segment } from "zwift-data";
import { WORLDS_BY_SLUG } from "../../../../../constants";
import { useOnScreen } from "../../../../../hooks/useOnScreen";
import { useStore } from "../../../../../hooks/useStore";
import { HoverStateType } from "../../../../../types";
import { Distance } from "../../../../Distance";
import { Elevation } from "../../../../Elevation";
import { SegmentElevationChartPreview } from "../../../../ElevationChartPreview";
import { ListItemState } from "../../../../ListItemState";

export interface Props {
  segment: Segment;
  showWorldName: boolean;
}

export function ListItemSegment({ segment, showWorldName }: Props) {
  const setHoverState = useStore((store) => store.setHoverState);

  return (
    <ListItemState
      state={{
        world: WORLDS_BY_SLUG[segment.world],
        segment,
        type: "segment",
      }}
      onClick={() => setHoverState(undefined)}
      secondaryText={
        <SegmentInfo segment={segment} showWorldName={showWorldName} />
      }
      threeLines={showWorldName}
      rightAddonType="large-media"
      rightAddon={<ChartContainer segment={segment} />}
      onMouseEnter={() =>
        setHoverState({
          type: HoverStateType.PreviewSegment,
          segment: segment.slug,
        })
      }
      onMouseLeave={() => setHoverState(undefined)}
    >
      {segment.name}
    </ListItemState>
  );
}

interface SegmentInfoProps {
  segment: Segment;
  showWorldName: boolean;
}

function SegmentInfo({ segment, showWorldName }: SegmentInfoProps) {
  return (
    <>
      {showWorldName && (
        <>
          {WORLDS_BY_SLUG[segment.world].name}
          <br />
        </>
      )}
      <Distance distance={segment.distance} />
      {segment.elevation !== undefined ? (
        <>
          {" | "}
          <Elevation elevation={segment.elevation} />
        </>
      ) : null}
    </>
  );
}

interface ChartProps {
  segment: Segment;
}

function ChartContainer({ segment }: ChartProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onScreen = useOnScreen(ref);

  return (
    <div ref={ref} style={{ width: "100%", pointerEvents: "none" }}>
      {onScreen ? <SegmentElevationChartPreview segment={segment} /> : null}
    </div>
  );
}
