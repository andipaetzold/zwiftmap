const routeGeoJSONCache: { [routeSlug: string]: any } = {};

export async function getRouteGeoJSON(routeSlug: string): Promise<any> {
  if (!routeGeoJSONCache[routeSlug]) {
    const response = await fetch(`routes/${routeSlug}.geojson`);
    routeGeoJSONCache[routeSlug] = await response.json();
  }

  return routeGeoJSONCache[routeSlug];
}
