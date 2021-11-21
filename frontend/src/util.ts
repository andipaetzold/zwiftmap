export function flipLatLng(p: [number, number]): [number, number] {
  return [p[1], p[0]];
}

export async function shareImage(url: string): Promise<void> {
  const response = await fetch(url);
  const blob = await response.blob();

  const lastModified = response.headers.has("last-modified")
    ? +response.headers.get("last-modified")!
    : new Date().getTime();
  const files = [
    new File([blob], url.split("/").pop()!, {
      type: "image/png",
      lastModified,
    }),
  ];

  await navigator.share({ files });
}
