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

  const type = contentNode.getAttribute("data-react-class");
  if (type !== "Activity") {
    return;
  }

  const props = JSON.parse(contentNode.getAttribute("data-react-props")!);
  if (props.entity !== "Activity") {
    return;
  }

  const description = props.activity.description ?? "";
  const match = PATTERN_URL.exec(description);
  if (!match) {
    return;
  }

  const shareId = match[1];

  const mapImage =
    contentNode.querySelector<HTMLImageElement>("[data-testid=map]");
  if (!mapImage) {
    return;
  }

  const rect = mapImage.getBoundingClientRect();
  const urlSmall = `https://res.cloudinary.com/zwiftmap/image/upload/c_fill,w_${Math.round(
    rect.width
  )},h_${Math.round(rect.height)},f_auto/s/${shareId}`;
  const urlBig = `https://res.cloudinary.com/zwiftmap/image/upload/c_fill,w_${Math.round(
    rect.width * 2
  )},h_${Math.round(rect.height * 2)},f_auto/s/${shareId}`;

  mapImage.setAttribute("src", urlSmall);
  mapImage.setAttribute("srcset", urlBig);
}
