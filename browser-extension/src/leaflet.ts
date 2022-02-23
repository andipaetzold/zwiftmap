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

export function initLeaflet() {
  L.Map.addInitHook(function () {
    addOverlays(this);
  });

  if (Strava.Maps.Mapbox) {
    Strava.Maps.Mapbox.CustomControlView.prototype.changeMapType = function (
      ...args: any[]
    ) {
      this.delegateEvents();

      const map = this.map();
      addOverlays(map.instance);

      return map.setLayer(...args);
    };
  }

  const mapContainer = document.getElementById("map-type-control");
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
  options.classList.remove("open-menu");

  const standardOption = options.querySelector<HTMLAnchorElement>("a");
  if (!satelliteOption) {
    return;
  }
  standardOption.click();
  options.classList.remove("open-menu");
}
