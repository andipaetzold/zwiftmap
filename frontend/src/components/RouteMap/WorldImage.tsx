import { ImageOverlay } from "react-leaflet";
import { World } from "zwift-data";
import { worldConfigs } from "../../constants/worldConfigs";

interface Props {
  world: World;
}

export function WorldImage({ world }: Props) {
  const worldConfig = worldConfigs[world.slug];

  return (
    <ImageOverlay
      url={worldConfig.image}
      bounds={world.bounds}
      attribution='&amp;copy <a href="https://zwift.com" rel="noreferrer noopener">Zwift</a>'
    />
  );
}
