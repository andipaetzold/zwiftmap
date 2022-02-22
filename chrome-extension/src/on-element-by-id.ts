export function onElementById(
  id: string,
  callback: (element: HTMLElement) => void
) {
  const element = document.getElementById(id);
  if (element) {
    callback(element);
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (!mutation.addedNodes) {
        continue;
      }

      for (const node of mutation.addedNodes) {
        if (node instanceof HTMLElement) {
          const nodeWithId = node.querySelector<HTMLElement>(`#${id}`);
          if (nodeWithId) {
            callback(nodeWithId);
          }
        }
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
  });
}
