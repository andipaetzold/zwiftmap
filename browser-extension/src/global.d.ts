import * as Leaflet from "leaflet";

declare global {
  var L: typeof Leaflet;
  var pageView:
    | {
        _activity?: { attributes?: { detailedType?: string } };
        mapContext?: () => { map(): Leaflet.Map };
      }
    | undefined;
}
