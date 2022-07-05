import { request } from "./request";
import { hasSharedLink, replaceImage } from "./utils";

interface FeedResponseData {
  entries: Entry[];
  pagination: Pagination;
}

type Entry = { cursorData: CursorData } & (
  | { entity: "Post" | "Challenge" }
  | ActivityEntry
  | GroupActivityEntry
);

interface ActivityEntry {
  entity: "Activity";
  activity: {
    id: string;
    activityName: string;
    description: null | string;
  };
}

interface GroupActivityEntry {
  entity: "GroupActivity";
  rowData: {
    activities: {
      activity_id: number;
      name: string;
      description: null | string;
    }[];
  };
}

interface Pagination {
  maxEntries: boolean;
  hasMore: boolean;
}

interface CursorData {
  before: string;
  rank: string;
}

export function initFeed() {
  const container = document.querySelector<HTMLElement>(
    "[data-react-class=FeedRouter]"
  );

  if (!container) {
    return;
  }

  const propsRaw = container.getAttribute("data-react-props");
  if (!propsRaw) {
    return;
  }
  const props = JSON.parse(propsRaw);
  let fetchEntry = createFeedEntriesFetcher(props);

  replaceEntries(container, fetchEntry);
  new MutationObserver(() => {
    replaceEntries(container, fetchEntry);
  }).observe(container, { childList: true });
}

async function replaceEntries(
  container: HTMLElement,
  fetchEntry: ReturnType<typeof createFeedEntriesFetcher>
) {
  for (const entryElement of container.childNodes) {
    if (!entryElement.firstChild) {
      continue;
    }

    const child = entryElement.firstChild as HTMLElement;
    await replaceEntry(child, fetchEntry);
  }
}

async function replaceEntry(
  node: HTMLElement,
  fetchEntry: ReturnType<typeof createFeedEntriesFetcher>
) {
  const index = parseInt(node.getAttribute("index") ?? "");
  if (isNaN(index)) {
    return;
  }

  const entry = await fetchEntry(index);
  if (!entry) {
    return;
  }

  switch (entry.entity) {
    case "Activity":
      replaceActivityImage(node, entry);
      break;
    case "GroupActivity":
      replaceGroupActivityImage(node, entry);
      break;
  }
}

function replaceActivityImage(contentNode: HTMLElement, entry: ActivityEntry) {
  if (!hasSharedLink(entry.activity.description ?? "")) {
    return;
  }

  const mapImage =
    contentNode.querySelector<HTMLImageElement>("[data-testid=map]");
  if (!mapImage) {
    return;
  }

  const rect = mapImage.getBoundingClientRect();
  const ratio = rect.width / rect.height;

  if (Math.abs(ratio - 1) < 0.1) {
    replaceImage(
      mapImage,
      `/strava-activities/${entry.activity.id}/feed-square.png`
    );
  } else {
    replaceImage(
      mapImage,
      `/strava-activities/${entry.activity.id}/feed-wide.png`
    );
  }
}

function replaceGroupActivityImage(
  contentNode: HTMLElement,
  entry: GroupActivityEntry
) {
  const activity = entry.rowData.activities.find((activity) =>
    hasSharedLink(activity.description ?? "")
  );

  if (!activity) {
    return;
  }

  const mapImage =
    contentNode.querySelector<HTMLImageElement>("[data-testid=map]");
  if (!mapImage) {
    return;
  }

  replaceImage(
    mapImage,
    `/strava-activities/${activity.activity_id}/feed-group.png`
  );
}

interface FeedRouterProps {
  clubId: string;
  currentAthleteId: number;
  feedType: string;
  preFetchedEntries: Entry[];
  page: string;
}

function createFeedEntriesFetcher({
  page,
  preFetchedEntries,
  currentAthleteId,
  clubId,
  feedType,
}: FeedRouterProps) {
  let hasMore = page !== "profile";
  let maxEntries = true;

  const entries: Entry[] = [...preFetchedEntries];

  /**
   * `buildEndpointUrl` of `useFetchFeedEntries.js`
   */
  const createUrl = (): string | null => {
    const { before, rank } = entries[entries.length - 1]?.cursorData ?? {};

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
    url = before ? url.concat(`&before=${before}`) : url; // See README for how before and rank cursor works
    url = rank ? url.concat(`&cursor=${rank}`) : url;

    return url;
  };

  const loadNextPage = async (): Promise<void> => {
    const url = createUrl();
    if (!url) {
      throw new Error("Cannot generate url");
    }

    const data = await request<FeedResponseData>(url);
    entries.push(...data.entries);
    maxEntries = data.pagination.maxEntries;
    hasMore = data.pagination.hasMore && data.entries.length !== 0;
  };

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
