import { Helmet } from "react-helmet-async";
import { createUrl, useLocationState } from "../../services/location-state";

export function Head() {
  const [locationState] = useLocationState();

  return (
    <Helmet defaultTitle="ZwiftMap" titleTemplate="%s - ZwiftMap">
      <link
        rel="canonical"
        href={`${window.origin}${createUrl(locationState)}`}
      />
    </Helmet>
  );
}
