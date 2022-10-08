export function positionToLatLng(position: number[]): [number, number] {
  return [position[1], position[0]];
}

export function latLngToPosition(
  latLng: [number, number] | { lat: number; lng: number }
): number[] {
  if (Array.isArray(latLng)) {
    return [latLng[1], latLng[0]];
  }

  return [latLng.lng, latLng.lat];
}
