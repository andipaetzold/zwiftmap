import { ListSubheader } from "@react-md/list";
import { routes, Segment } from "zwift-data";
import { ListItemRoute } from "../../../ListItemRoute";

interface Props {
  segment: Segment;
}

export function SegmentRoutes({ segment }: Props) {
  const routesWithSegment = routes.filter((r) =>
    r.segments.includes(segment.slug),
  );

  return (
    <>
      <ListSubheader>Routes</ListSubheader>
      {routesWithSegment.map((route) => (
        <ListItemRoute key={route.slug} route={route} showWorldName={false} />
      ))}
    </>
  );
}
