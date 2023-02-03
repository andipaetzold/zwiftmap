import { round } from "lodash-es";
import { ImageOverlay, useMapEvent } from "react-leaflet";
import { World } from "zwift-data";
import { worldConfigs } from "../../constants/worldConfigs";

interface Props {
  world: World;
}

export function WorldImage({ world }: Props) {
  const worldConfig = worldConfigs[world.slug];

  useMapEvent("click", (e) =>
    console.log(
      `createNode(${[
        round(e.latlng.lat, 6),
        round(e.latlng.lng, 6),
        0,
      ].toString()})`
    )
  );

  return (
    <ImageOverlay
      url={worldConfig.image}
      bounds={world.bounds}
      attribution='&amp;copy <a href="https://zwift.com" rel="noreferrer noopener">Zwift</a>'
    />
  );
}
