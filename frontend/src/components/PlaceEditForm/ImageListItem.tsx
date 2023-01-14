import { useEffect, useState } from "react";
import { ImageListItem } from "../ImageListItem";

interface Props {
  image: File | null;
  fallbackUrl?: string;
}

export function PlaceImageListItem({ image, fallbackUrl }: Props) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      if (!image) {
        return;
      }
      const reader = new FileReader();
      reader.onload = () => setImageUrl(reader.result as string);
      reader.onerror = () => setImageUrl(undefined);
      reader.readAsDataURL(image);
    })();
  }, [image]);

  const url = imageUrl ?? fallbackUrl;

  if (!url) {
    return null;
  }
  return <ImageListItem src={url} />;
}
