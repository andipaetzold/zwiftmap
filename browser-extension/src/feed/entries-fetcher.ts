import { request } from "../request";
import { preventParallelCalls } from "../utils";
import { FeedProps, Entry } from "./types";

interface FeedResponseData {
  entries: Entry[];
  pagination: Pagination;
}

interface Pagination {
  maxEntries: boolean;
  hasMore: boolean;
}

export function createFeedEntriesFetcher({
  page,
  currentAthleteId,
  preFetchedEntries,
  clubId,
  feedType,
}: FeedProps) {
  let hasMore = page !== "profile";
  let maxEntries = true;

  const entries = [...preFetchedEntries];

  /**
   * `buildEndpointUrl` of `useFetchFeedEntries.js`
   */
  const createUrl = (): string | null => {
    const { updated_at, rank } = entries[entries.length - 1]?.cursorData ?? {};

    let url: string;
    switch (page) {
      case "dashboard":
        url = `/dashboard/feed`;
        break;
      case "club":
        url = `/clubs/${clubId}/feed`;
        break;
      case "profile":
        // profile feed entries are pre-fetched since it is still reloaded on interval graph filters and is not paginated
        return null;
      default:
        return null;
    }

    url = url.concat(`?feed_type=${feedType}`);
    url = currentAthleteId
      ? url.concat(`&athlete_id=${currentAthleteId}`)
      : url;
    url = clubId ? url.concat(`&club_id=${clubId}`) : url;
    url = updated_at ? url.concat(`&before=${updated_at}`) : url; // See README for how before and rank cursor works
    url = rank ? url.concat(`&cursor=${rank}`) : url;

    return url;
  };

  const loadNextPage = preventParallelCalls(async (): Promise<void> => {
    const url = createUrl();
    if (!url) {
      throw new Error("Cannot generate url");
    }

    const data = await request<FeedResponseData>(url);
    entries.push(...data.entries);
    maxEntries = data.pagination.maxEntries;
    hasMore = data.pagination.hasMore && data.entries.length !== 0;
  });

  const fetchEntry = async (index: number): Promise<Entry | undefined> => {
    while (!entries[index]) {
      if (!hasMore) {
        break;
      }
      await loadNextPage();
    }

    return entries[index];
  };

  return fetchEntry;
}
