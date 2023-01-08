import { Helmet } from "react-helmet-async";

interface Props {
  name: string;
}

export function PlaceHelmet({ name }: Props) {
  const description = `Place details for "${name}"`;
  return (
    <Helmet>
      <title>{name}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={`${name} - ZwiftMap`} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
