import { useAsync } from "react-async-hook";
import { BACKEND_HOST } from "../config";
import { PATTERN_SHARE } from "../constants";
import { Share } from "../types";
import { usePath } from "./usePath";

export function useShare(): Share | undefined {
  const path = usePath();
  const result = PATTERN_SHARE.exec(path);
  const shareId = result?.groups?.["shareId"];

  const { result: share } = useAsync<Share>(
    async (id: string | undefined) => {
      if (id) {
        const response = await fetch(
          `${BACKEND_HOST}/share/${id}`
        );
        return await response.json();
      } else {
        return undefined;
      }
    },
    [shareId]
  );

  return share;
}
