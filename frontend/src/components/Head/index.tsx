import { Helmet } from "react-helmet-async";
import { createUrl, useLocationState } from "../../services/location-state";

export function Head() {
  const state = useLocationState();

  return (
    <Helmet defaultTitle="ZwiftMap" titleTemplate="%s - ZwiftMap">
      <link rel="canonical" href={`${window.origin}${createUrl(state)}`} />
    </Helmet>
  );
}
