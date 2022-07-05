import { hasSharedLink, replaceImage } from "../utils";
import { createFeedEntriesFetcher } from "./entries-fetcher";
import { ActivityEntry, FeedRouterProps, GroupActivityEntry } from "./types";

export function initFeed() {
  const containerParent =
    document.querySelector<HTMLElement>(".react-feed-container") ?? // profile & club
    document.querySelector<HTMLElement>(".feed-container"); // dashboard

  if (!containerParent) {
    return;
  }

  let unsubscribe: (() => void) | undefined;
  unsubscribe = initFeedRouter(containerParent);
  new MutationObserver(() => {
    unsubscribe?.();
    unsubscribe = initFeedRouter(containerParent);
  }).observe(containerParent, {
    subtree: false,
    childList: true,
  });
}

function initFeedRouter(
  parentContainer: HTMLElement
): (() => void) | undefined {
  const container = parentContainer.querySelector<HTMLElement>(
    "[data-react-class=FeedRouter]"
  );

  if (!container) {
    return;
  }

  const props = getFeedRouterProps(container);
  if (!props) {
    return;
  }

  const fetchEntry = createFeedEntriesFetcher(props);
  replaceEntries(container, fetchEntry);

  const observer = new MutationObserver(() => {
    replaceEntries(container, fetchEntry);
  });
  observer.observe(container, { childList: true });
  return () => observer.disconnect();
}

function getFeedRouterProps(container: HTMLElement): FeedRouterProps | null {
  const propsRaw = container.getAttribute("data-react-props");
  if (!propsRaw) {
    return null;
  }

  return JSON.parse(propsRaw);
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
