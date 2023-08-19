import { Helmet } from "react-helmet-async";

export function PlaceNewHelmet() {
  const description = `Submit a new place`;

  return (
    <Helmet>
      <title>New Place</title>
      <meta property="og:title" content="New Place - ZwiftMap" />

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
