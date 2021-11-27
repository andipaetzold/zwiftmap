import { ListSubheader } from "@react-md/list";
import { routes, Segment } from "zwift-data";
import { HoverData } from "../../../../types";
import { ListItemRoute } from "../../../ListItemRoute";

interface Props {
  segment: Segment;
  onHoverRoute: (data: HoverData) => void;
}

export function SegmentRoutes({ segment, onHoverRoute }: Props) {
  const routesWithSegment = routes.filter((r) =>
    r.segments.includes(segment.slug)
  );

  return (
    <>
      <ListSubheader>Routes</ListSubheader>
      {routesWithSegment.map((route) => (
        <ListItemRoute
          key={route.slug}
          route={route}
          showWorldName={false}
          onHoverRoute={onHoverRoute}
        />
      ))}
    </>
  );
}
