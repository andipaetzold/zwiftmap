import { Helmet } from "react-helmet-async";
import { ShareStravaActivity } from "../../../../../types";

interface Props {
  share: ShareStravaActivity;
  imageUrl: string;
}

export function SharedStravaActivityHelmet({ share, imageUrl }: Props) {
  const title = `${share.activity.name} - ZwiftMap`;
  const description = `Shared Zwift activity "${share.activity.name}"`;

  return (
    <Helmet>
      <title>{share.activity.name}</title>
      <meta name="description" content={description} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:height" content="1080" />
      <meta property="og:image:width" content="1920" />
    </Helmet>
  );
}
