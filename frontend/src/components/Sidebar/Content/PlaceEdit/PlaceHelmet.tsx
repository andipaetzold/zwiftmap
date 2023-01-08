import { Helmet } from "react-helmet-async";

interface Props {
  name: string;
}

export function PlaceEditHelmet({ name }: Props) {
  const description = `Edit place "${name}"`;
  return (
    <Helmet>
      <title>Edit {name}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={`${name} - ZwiftMap`} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
