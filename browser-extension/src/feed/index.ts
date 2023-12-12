import { hasSharedLink, replaceImage, waitForElement } from "../utils";
import { createFeedEntriesFetcher } from "./entries-fetcher";
import { ActivityEntry, FeedProps, GroupActivityEntry } from "./types";

export async function initFeed() {
  const feedComponent = await waitForElement(
    ".react-feed-component, .dashboard-mfe"
  );
  const feedUIElement = await waitForElement(".feed-ui");

  initFeedRouter(feedComponent, feedUIElement);
}

function initFeedRouter(
  feedComponent: HTMLElement,
  feedUI: HTMLElement
): (() => void) | undefined {
  const props = getFeedProps(feedComponent);
  if (!props) {
    return;
  }

  const fetchEntry = createFeedEntriesFetcher(props);
  replaceEntries(feedUI, fetchEntry);

  const observer = new MutationObserver(() => {
    replaceEntries(feedUI, fetchEntry);
  });
  observer.observe(feedUI, { childList: true, subtree: true });
  return () => observer.disconnect();
}

function getFeedProps(container: HTMLElement): FeedProps | null {
  const propsRaw = container.getAttribute("data-react-props");
  if (!propsRaw) {
    return null;
  }

  let props = JSON.parse(propsRaw);
  if (!("appContext" in props)) {
    return null;
  }

  props = props.appContext;

  if ("feedProps" in props) {
    props = props.feedProps;
  }

  return props;
}

async function replaceEntries(
  container: HTMLElement,
  fetchEntry: ReturnType<typeof createFeedEntriesFetcher>
) {
  for (const entryElement of container.children) {
    if (entryElement instanceof HTMLElement) {
      await replaceEntry(entryElement, fetchEntry);
    }
  }
}

async function replaceEntry(
  node: HTMLElement,
  fetchEntry: ReturnType<typeof createFeedEntriesFetcher>
) {
  const index = parseInt(
    node
      .querySelector('[data-testid="web-feed-entry"]')
      ?.getAttribute("index") ?? ""
  );
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
