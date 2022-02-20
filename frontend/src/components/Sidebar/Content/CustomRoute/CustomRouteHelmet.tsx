import { Helmet } from "react-helmet-async";
import { World } from "zwift-data";

interface Props {
  world: World;
}

export function CustomRouteHelmet({ world }: Props) {
  const description = `Create a custom route in ${world.name} on Zwift`;

  return (
    <Helmet>
      <title>Custom Route</title>
      <meta property="og:title" content="Custom Route - ZwiftMap" />

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
