import { request } from "./request";
import { hasSharedLink, replaceImage } from "./utils";

interface FeedResponseData {
  entries: Entry[];
  pagination: Pagination;
}

interface Entry {
  entity: "Activity" | "Challenge" | "Post";
  activity: Activity;
  cursorData: CursorData;
}

interface Activity {
  id: string;
  activityName: string;
  description: null | string;
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

  let fetcher: ReturnType<typeof createFeedEntriesFetcher>;

  updateFetcher();
  new MutationObserver(() => {
    console.log("mutate");
    updateFetcher();
  }).observe(container, { attributes: true });

  function updateFetcher() {
    if (!container) {
      return;
    }
    const containerData = JSON.parse(
      container.getAttribute("data-react-props")!
    );
    fetcher = createFeedEntriesFetcher(containerData);
  }

  replaceEntries(container, fetcher!.getEntries());
  new MutationObserver(() => {
    replaceEntries(container, fetcher.getEntries());
  }).observe(container, { childList: true });
}

function replaceEntries(container: HTMLElement, entries: Entry[]) {
  for (const entryElement of container.childNodes) {
    if (!entryElement.firstChild) {
      continue;
    }

    const child = entryElement.firstChild as HTMLElement;
    replaceEntry(child, entries);
  }
}

function replaceEntry(node: HTMLElement, entries: Entry[]) {
  const index = parseInt(node.getAttribute("index") ?? "");
  if (isNaN(index)) {
    return;
  }

  const entry = entries[index];
  switch (entry.entity) {
    case "Activity":
      replaceActivityNode(node, entry);
      break;
  }
}

function replaceActivityNode(contentNode: HTMLElement, { activity }: Entry) {
  const shareId = hasSharedLink(activity.description ?? "");
  if (!shareId) {
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
    replaceImage(mapImage, `/strava-activities/${activity.id}/feed-square.png`);
  } else {
    replaceImage(mapImage, `/strava-activities/${activity.id}/feed-wide.png`);
  }
}

function handleFeedGroupActivityNode(contentNode: HTMLElement, props: any) {
  const activity = props.rowData.activities.find((activity) =>
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

interface FeedEntriesFetcherOptions {
  page: string;
  preFetchedEntries: Entry[];
  currentAthleteId: number;
  clubId: string;
  feedType: "dashboard" | "club" | "profile";
}

function createFeedEntriesFetcher({
  clubId,
  feedType,
  page,
  preFetchedEntries,
  currentAthleteId,
}: FeedEntriesFetcherOptions) {
  const entries = preFetchedEntries ?? [];
  const searchParams = new URLSearchParams(document.location.search);

  const buildEndpointUrl = (): string | null => {
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

  const loadEntries = async () => {
    const url = buildEndpointUrl();
    if (!url) {
      return;
    }

    const data = await request(url);
    entries.push(...data.entries);

    console.log(entries);
  };

  const getEntries = () => entries;

  return { loadEntries, getEntries };
}
