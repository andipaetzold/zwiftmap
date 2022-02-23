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

  if (Strava.Maps.Mapbox) {
    const changeMapTypeOrg =
      Strava.Maps.Mapbox.CustomControlView.prototype.changeMapType;
    Strava.Maps.Mapbox.CustomControlView.prototype.changeMapType = function (
      ...args: any[]
    ) {
      const map = this.map();
      addOverlays(map.instance);

      return changeMapTypeOrg.call(this, ...args);
    };

    const mapContainer = await getMapTypeControl();
    if (!mapContainer) {
      return;
    }

    const options = mapContainer.querySelector<HTMLUListElement>(".options");
    if (!options) {
      return;
    }

    const satelliteOption = options.querySelector<HTMLAnchorElement>("a");
    if (!satelliteOption) {
      return;
    }

    satelliteOption.click();
    mapContainer.classList.remove("active");
    options.classList.remove("open-menu");

    const standardOption = options.querySelector<HTMLAnchorElement>("a");
    if (!standardOption) {
      return;
    }
    standardOption.click();
    mapContainer.classList.remove("active");
    options.classList.remove("open-menu");
  }
}

async function getMapTypeControl(): Promise<HTMLElement> {
  const mapContainer = document.querySelector<HTMLElement>("#map-type-control");
  if (mapContainer) {
    return mapContainer;
  }

  return await new Promise<HTMLElement>((resolve) => {
    const observer = new MutationObserver(() => {
      const container =
        document.querySelector<HTMLElement>("#map-type-control");
      if (container) {
        observer.disconnect();
        resolve(container);
        return;
      }
    });

    const wrappers = [
      document.getElementById("view"),
      document.getElementById("map_canvas"),
    ];
    for (const wrapper of wrappers) {
      if (wrapper === null) {
        continue;
      }
      observer.observe(wrapper, { childList: true, subtree: true });
    }
  });
}

function isVirtual() {
  const activityType: string =
    globalThis.pageView?._activity.attributes.detailedType ?? "virtual";
  return activityType.toLocaleLowerCase().includes("virtual");
}
