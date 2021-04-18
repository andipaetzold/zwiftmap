export function getTouch(
  e: TouchEvent,
  identifier: number
): { clientX: number; clientY: number } | undefined {
  if (e.targetTouches) {
    for (let i = 0; i < e.targetTouches.length; ++i) {
      if (e.targetTouches[i].identifier === identifier) {
        return e.targetTouches[i];
      }
    }
  }

  if (e.changedTouches) {
    for (let i = 0; i < e.changedTouches.length; ++i) {
      if (e.changedTouches[i].identifier === identifier) {
        return e.changedTouches[i];
      }
    }
  }
}

export function getTouchIdentifier(e: TouchEvent): number | undefined {
  if (e.targetTouches && e.targetTouches[0]) {
    return e.targetTouches[0].identifier;
  }
  if (e.changedTouches && e.changedTouches[0]) {
    return e.changedTouches[0].identifier;
  }
}
