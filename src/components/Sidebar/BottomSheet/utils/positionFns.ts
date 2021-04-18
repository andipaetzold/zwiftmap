import type DraggableCore from "../DraggableCore";
import { getTouch } from "./domFns";
import type { Bounds, DraggableData, MouseTouchEvent } from "./types";

export function getBoundPosition(bounds: Bounds, y: number): number {
  let newY = y;
  if (typeof bounds.bottom === "number") {
    newY = Math.min(newY, bounds.bottom);
  }
  if (typeof bounds.top === "number") {
    newY = Math.max(newY, bounds.top);
  }

  return newY;
}

export function getControlPosition(
  e: MouseTouchEvent,
  touchIdentifier: number | undefined
): number | undefined {
  const touchObj =
    typeof touchIdentifier === "number" ? getTouch(e, touchIdentifier) : null;

  if (typeof touchIdentifier === "number" && !touchObj) {
    return undefined;
  }

  return (touchObj || e).clientY;
}

export function createCoreData(
  draggable: DraggableCore,
  y: number
): DraggableData {
  const state = draggable.state;
  const isStart =
    typeof state.lastY !== "number" || isNaN(state.lastY);
  const node = draggable.props.nodeRef.current!;

  if (isStart) {
    return {
      node,
      deltaY: 0,
      lastY: y,
      y,
    };
  } else {
    return {
      node,
      deltaY: y - state.lastY,
      lastY: state.lastY,
      y,
    };
  }
}

