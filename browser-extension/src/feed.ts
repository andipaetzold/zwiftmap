const PATTERN_URL = /https:\/\/zwiftmap\.com\/s\/(\w{22})/;

export function initFeed() {
  const container =
    document.getElementById("dashboard-feed") ??
    document.getElementById("activity-log");

  if (!container) {
    return;
  }

  const feedContainer = getFeedElement(container);
  if (feedContainer) {
    feedContainer.childNodes.forEach((node) => handleFeedNode(node));
  }

  const observer = new MutationObserver(() => {
    const feedContainer = getFeedElement(container);
    if (feedContainer) {
      feedContainer.childNodes.forEach((node) => handleFeedNode(node));
    }
  });

  observer.observe(container, {
    childList: true,
    subtree: true,
  });
}

function getFeedElement(container: HTMLElement) {
  return container.querySelector<HTMLElement>(".feed");
}

function handleFeedNode(node: Node) {
  if (!(node instanceof HTMLElement)) {
    return;
  }

  const contentNode = node.querySelector<HTMLElement>(".content");
  if (!contentNode) {
    return;
  }

  const props = JSON.parse(contentNode.getAttribute("data-react-props")!);
  switch (props.entity) {
    case "Activity":
      handleFeedActivityNode(contentNode, props);
      break;
    case "GroupActivity":
      handleFeedGroupActivityNode(contentNode, props);
      break;
  }
}

function handleFeedActivityNode(contentNode: HTMLElement, { activity }: any) {
  const shareId = extractShareId(activity.description ?? "");
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
    replaceImage(
      mapImage,
      `/strava-activities/${activity.id}/feed-square.png`,
      extractShareId(activity.description)!
    );
  } else {
    replaceImage(
      mapImage,
      `/strava-activities/${activity.id}/feed-wide.png`,
      extractShareId(activity.description)!
    );
  }
}

function handleFeedGroupActivityNode(contentNode: HTMLElement, props: any) {
  const activity = props.rowData.activities.find(
    (activity) => !!extractShareId(activity.description ?? "")
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
    `/strava-activities/${activity.activity_id}/feed-group.png`,
    extractShareId(activity.description)!
  );
}

async function replaceImage(
  element: HTMLImageElement,
  path: string,
  shareId: string
) {
  const imagesUrl = `https://storage.googleapis.com/images.zwiftmap.com${path}`;
  const cloudinaryUrl = `https://res.cloudinary.com/zwiftmap/image/upload/s/${shareId}`;

  element.removeAttribute("srcset");

  element.setAttribute("src", imagesUrl);
  element.setAttribute(
    "onerror",
    `this.onerror=null;this.src='${cloudinaryUrl}'`
  );
}

function extractShareId(description: string): string | undefined {
  const match = PATTERN_URL.exec(description);
  if (!match) {
    return;
  }

  return match[1];
}
