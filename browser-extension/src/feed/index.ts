import {
  createAbortControllerFromSignal,
  hasSharedLink,
  replaceImage,
  subscribeToElement,
  waitForElement,
} from "../utils";
import { createFeedEntriesFetcher } from "./entries-fetcher";
import { ActivityEntry, FeedProps, GroupActivityEntry } from "./types";

/**
 * Run `initFeed2` for each `.react-feed-component` element.
 */
export async function initFeed() {
  let controller = new AbortController();

  subscribeToElement(".react-feed-component, .dashboard-mfe", {
    callback: (feedComponent) => {
      controller.abort();

      if (!feedComponent) {
        return;
      }

      const props = getFeedProps(feedComponent);
      if (!props) {
        return;
      }

      controller = new AbortController();
      initFeed2(props, feedComponent, controller.signal);
    },
  });
}

/**
 * Run `initFeed2` for each `.feed-ui` element.
 */
function initFeed2(
  props: FeedProps,
  parent: HTMLElement,
  incomingSignal: AbortSignal
) {
  let controller = createAbortControllerFromSignal(incomingSignal);

  subscribeToElement(".feed-ui", {
    parent,
    signal: incomingSignal,
    callback: (feedUI) => {
      controller.abort();
      if (!feedUI) {
        return;
      }

      controller = createAbortControllerFromSignal(incomingSignal);
      initFeed3(props, feedUI, controller.signal);
    },
  });
}

/**
 * Subscribe to children of `.feed-ui` and replace images.
 */
function initFeed3(
  props: FeedProps,
  feedUI: HTMLElement,
  incomingSignal: AbortSignal
) {
  const fetchEntry = createFeedEntriesFetcher(props);

  let controller = createAbortControllerFromSignal(incomingSignal);
  replaceEntries(feedUI, fetchEntry, controller.signal);
  const observer = new MutationObserver(() => {
    if (controller.signal.aborted) {
      observer.disconnect();
      return;
    }

    controller.abort();
    controller = createAbortControllerFromSignal(incomingSignal);
    replaceEntries(feedUI, fetchEntry, controller.signal);
  });
  observer.observe(feedUI, { childList: true, subtree: false });
  incomingSignal.addEventListener("abort", () => observer.disconnect());
}

function getFeedProps(container: HTMLElement): FeedProps | null {
  try {
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
  } catch {
    return null;
  }
}

async function replaceEntries(
  container: HTMLElement,
  fetchEntry: ReturnType<typeof createFeedEntriesFetcher>,
  signal: AbortSignal
) {
  for (const entryElement of container.children) {
    if (!(entryElement instanceof HTMLElement)) {
      continue;
    }
    await replaceEntry(entryElement, fetchEntry, signal);
  }
}

async function replaceEntry(
  node: HTMLElement,
  fetchEntry: ReturnType<typeof createFeedEntriesFetcher>,
  signal: AbortSignal
) {
  const entryNode = await waitForElement('[data-testid="web-feed-entry"]', {
    parent: node,
    signal,
  });
  const index = parseInt(entryNode.getAttribute("index") ?? "");
  if (isNaN(index)) {
    return;
  }

  const entry = await fetchEntry(index);
  if (!entry) {
    return;
  }

  switch (entry.entity) {
    case "Activity":
      await replaceActivityImage(node, entry, signal);
      break;
    case "GroupActivity":
      await replaceGroupActivityImage(node, entry, signal);
      break;
  }
}

async function replaceActivityImage(
  contentNode: HTMLElement,
  entry: ActivityEntry,
  signal: AbortSignal
) {
  if (!hasSharedLink(entry.activity.description ?? "")) {
    return;
  }

  const mapImage = await waitForElement<HTMLImageElement>("[data-testid=map]", {
    parent: contentNode,
    signal,
  });
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

async function replaceGroupActivityImage(
  contentNode: HTMLElement,
  entry: GroupActivityEntry,
  signal: AbortSignal
) {
  const activity = entry.rowData.activities.find((activity) =>
    hasSharedLink(activity.description ?? "")
  );

  if (!activity) {
    return;
  }

  const mapImage = await waitForElement<HTMLImageElement>("[data-testid=map]", {
    parent: contentNode,
    signal,
  });
  if (!mapImage) {
    return;
  }

  replaceImage(
    mapImage,
    `/strava-activities/${activity.activity_id}/feed-group.png`
  );
}
