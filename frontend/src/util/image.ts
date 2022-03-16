import { BACKEND_HOST } from "../config";

export function getShareImageUrl(shareId: string): string {
  return `${BACKEND_HOST}/share/${shareId}/image?width=1920&height=1080`;
}
