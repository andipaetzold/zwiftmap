import { Helmet } from "react-helmet";
import { createUrl, useLocationState } from "../../services/location-state";

export function Head() {
  const [locationState] = useLocationState();

  return (
    <Helmet>
      <link
        rel="canonical"
        href={`${window.origin}${createUrl(locationState)}`}
      />
    </Helmet>
  );
}
