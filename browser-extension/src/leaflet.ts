import { Map } from "leaflet";
import { worlds } from "zwift-data";
import { getURL } from "./utils";

const initializedLeafletIds = new Set<number>();

function addOverlays(map: Map) {
  // @ts-expect-error
  const id: number = map._leaflet_id;
  if (initializedLeafletIds.has(id)) {
    return;
  }
  initializedLeafletIds.add(id);

  const layers = worlds.map((world) => {
    const url = getURL(`../assets/worlds/${world.slug}.png`);
    return L.imageOverlay(url, world.bounds, {
      attribution:
        '© <a href="https://zwift.com" rel="noreferrer noopener">Zwift</a>',
    });
  });
  const layerGroup = L.layerGroup(layers);

  layerGroup.addTo(map);
}

export async function initLeaflet() {
  if (!isVirtual()) {
    return;
  }

  L.Map.addInitHook(function () {
    addOverlays(this);
  });

  const map = globalThis.pageView?.mapContext?.().map();
  if (map) {
    addOverlays(map);
  }
}

function isVirtual() {
  const activityType: string =
    globalThis.pageView?._activity.attributes.detailedType ?? "virtual";
  return activityType.toLocaleLowerCase().includes("virtual");
}
