import { BACKEND_HOST2 } from "../config";

export function getShareImageUrl(shareId: string): string {
  return `${BACKEND_HOST2}/share/${shareId}/image?width=1920&height=1080`;
}
