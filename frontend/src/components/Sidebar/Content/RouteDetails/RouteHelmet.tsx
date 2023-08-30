import { Helmet } from "react-helmet-async";
import { Route } from "zwift-data";
import { WORLDS_BY_SLUG } from "../../../../constants";

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
  const world = WORLDS_BY_SLUG[route.world];
  const description = `Route details for "${route.name}" in ${
    world.name
  } on Zwift. Distance: ${DISTANCE_FORMAT.format(
    route.distance,
  )}km. Elevation: ${ELEVATION_FORMAT.format(route.elevation)}m.`;

  return (
    <Helmet>
      <title>{route.name}</title>
      <meta
        name="description"
        content={`Route details for "${route.name}" in ${
          world.name
        } on Zwift. Distance: ${DISTANCE_FORMAT.format(
          route.distance,
        )}km. Elevation: ${ELEVATION_FORMAT.format(route.elevation)}m.`}
      />

      <meta property="og:title" content={`${route.name} - ZwiftMap`} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
