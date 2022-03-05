export function getShareImageUrl(shareId: string): string {
  return `https://api.zwiftmap.com/share/${shareId}/image?width=1920&height=1080`;
}
