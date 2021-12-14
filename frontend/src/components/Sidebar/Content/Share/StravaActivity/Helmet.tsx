import { Helmet } from "react-helmet-async";
import { ShareStravaActivity } from "../../../../../types";

interface Props {
  share: ShareStravaActivity;
  imageUrl: string | null;
}

export function SharedStravaActivityHelmet({ share, imageUrl }: Props) {
  const description = `Shared Zwift activity "${share.activity.name}"`;
  return (
    <Helmet>
      <title>{share.activity.name}</title>
      <meta name="description" content={description} />

      {imageUrl && (
        <meta name="twitter:card" content="summary_large_image" />
      )}

      <meta property="og:title" content={`${share.activity.name} - ZwiftMap`} />
      <meta property="og:description" content={description} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {imageUrl && <meta property="og:image:height" content="1080" />}
      {imageUrl && <meta property="og:image:width" content="1920" />}
    </Helmet>
  );
}
