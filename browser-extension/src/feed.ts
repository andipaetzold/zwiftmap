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

function handleFeedActivityNode(contentNode: HTMLElement, props: any) {
  const shareId = extractShareId(props.activity.description ?? "");
  if (!shareId) {
    return;
  }

  const mapImage =
    contentNode.querySelector<HTMLImageElement>("[data-testid=map]");
  if (!mapImage) {
    return;
  }

  replaceImage(mapImage, shareId);
}

function handleFeedGroupActivityNode(contentNode: HTMLElement, props: any) {
  const descriptions = props.rowData.activities.map(
    (activity: any) => activity.description as string | undefined
  );
  const shareId: string = descriptions
    .map((description: string | null) => extractShareId(description ?? ""))
    .filter((shareId: string | undefined) => !!shareId)[0];
  if (!shareId) {
    return;
  }

  const mapImage =
    contentNode.querySelector<HTMLImageElement>("[data-testid=map]");
  if (!mapImage) {
    return;
  }

  replaceImage(mapImage, shareId);
}

function replaceImage(element: HTMLImageElement, shareId: string) {
  const rect = element.getBoundingClientRect();
  const urlSmall = `https://res.cloudinary.com/zwiftmap/image/upload/c_fill,w_${Math.round(
    rect.width
  )},h_${Math.round(rect.height)},f_auto/s/${shareId}`;
  const urlBig = `https://res.cloudinary.com/zwiftmap/image/upload/c_fill,w_${Math.round(
    rect.width * 2
  )},h_${Math.round(rect.height * 2)},f_auto/s/${shareId}`;

  element.setAttribute("src", urlSmall);
  element.setAttribute("srcset", urlBig);
}

function extractShareId(description: string): string | undefined {
  const match = PATTERN_URL.exec(description);
  if (!match) {
    return;
  }

  return match[1];
}
