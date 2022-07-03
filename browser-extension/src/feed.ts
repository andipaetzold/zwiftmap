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
  if (!["/dashboard"].includes(document.location.pathname)) {
    return;
  }

  const container = document.querySelector<HTMLElement>(
    "[data-react-class=FeedRouter]"
  );

  if (!container) {
    return;
  }

  let fetchEntry = createFeedEntriesFetcher(document.location);

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

function createFeedEntriesFetcher(location: Location) {
  let hasMore = true;
  const entries: Entry[] = [];

  const locationParams = new URLSearchParams(location.search);
  const clubId = locationParams.get("club_id");
  const numEntries = locationParams.get("num_entries");
  const feedType = locationParams.get("feed_type") ?? "following";

  const createUrl = (): string => {
    const url = clubId ? `/clubs/${clubId}/feed` : `/dashboard/feed`;
    const params = new URLSearchParams();
    params.set("feed_type", feedType);
    if (numEntries) {
      params.set("num_entries", numEntries);
    }
    params.set("athlete_id", globalThis.currentAthlete.id);
    if (clubId) {
      params.set("club_id", clubId);
    }

    const { before, rank } = entries[entries.length - 1]?.cursorData ?? {};
    if (before) {
      params.set("before", before);
    }

    if (rank) {
      params.set("cursor", rank);
    }

    return `${url}?${params.toString()}`;
  };

  const loadNextPage = async (): Promise<void> => {
    const url = createUrl();
    const data = await request<FeedResponseData>(url);
    entries.push(...data.entries);
    hasMore = data.pagination.hasMore;
  };

  const fetchEntry = async (index: number): Promise<Entry | undefined> => {
    while (!entries[index]) {
      if (!hasMore) {
        break;
      }
      await loadNextPage();
    }

    return entries[index] ?? undefined;
  };

  return fetchEntry;
}
