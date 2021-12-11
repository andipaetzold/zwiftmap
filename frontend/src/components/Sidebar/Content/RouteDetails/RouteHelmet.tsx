import { Helmet } from "react-helmet-async";
import { Route, worlds } from "zwift-data";

const DISTANCE_FORMAT = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
  style: "decimal",
});

const ELEVATION_FORMAT = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  style: "decimal",
});

interface Props {
  route: Route;
}

export function RouteHelmet({ route }: Props) {
  const world = worlds.find((w) => w.slug === route.world)!;

  return (
    <Helmet>
      <title>{route.name}</title>
      <meta
        name="description"
        content={`Route details for "${route.name}" in ${
          world.name
        } on Zwift. Distance: ${DISTANCE_FORMAT.format(
          route.distance
        )}km. Elevation: ${ELEVATION_FORMAT.format(route.elevation)}m.`}
      />
    </Helmet>
  );
}
