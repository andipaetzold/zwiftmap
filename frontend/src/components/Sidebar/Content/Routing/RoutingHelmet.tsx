import { Helmet } from "react-helmet-async";
import { World } from "zwift-data";

interface Props {
  world: World;
}

export function RoutingHelmet({ world }: Props) {
  const description = `Custom Route in ${world.name} on Zwift`;

  return (
    <Helmet>
      <title>Routing</title>
      <meta property="og:title" content={`Routing - ZwiftMap`} />

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
