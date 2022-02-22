import { Map } from "leaflet";
import { worlds } from "zwift-data";
import { onElementById } from "./on-element-by-id";
import { getURL } from "./utils";

const layers = worlds.map((world) => {
  const url = getURL(`../assets/worlds/${world.slug}.png`);
  return L.imageOverlay(url, world.bounds, {
    attribution:
      '© <a href="https://zwift.com" rel="noreferrer noopener">Zwift</a>',
  });
});
const layerGroup = L.layerGroup(layers);

Strava.Maps.Mapbox.CustomControlView.prototype.changeMapType = function (
  ...args: any[]
) {
  this.delegateEvents();

  const map = this.map();
  addOverlays(map);

  return map.setLayer(...args);
};

function addOverlays({ instance: map }: { instance: Map }) {
  if (!map.hasLayer(layerGroup)) {
    layerGroup.addTo(map);
  }
}

onElementById("map-type-control", (mapTypeControl) => {
  const options = mapTypeControl.querySelector<HTMLUListElement>(".options");
  if (!options) {
    return;
  }

  const option = options?.querySelector<HTMLAnchorElement>("a");
  if (!option) {
    return;
  }

  option.click();
  options.classList.remove("open-menu");
});
