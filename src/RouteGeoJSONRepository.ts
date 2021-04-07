const routeGeoJSONCache: { [routeid: number]: any } = {};

export async function getRouteGeoJSON(routeId: number): Promise<any> {
  if (!routeGeoJSONCache[routeId]) {
    const response = await fetch(`geojson/${routeId}.geojson`);
    routeGeoJSONCache[routeId] = await response.json();
  }

  return routeGeoJSONCache[routeId];
}
