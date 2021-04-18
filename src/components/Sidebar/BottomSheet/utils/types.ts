export interface DraggableData {
  node: HTMLElement;
  y: number;
  deltaY: number;
  lastY: number;
};

export interface Bounds {
  top?: number;
  bottom?: number;
}

export type EventHandler<T> = (e: T) => void | false;

export type MouseTouchEvent = MouseEvent & TouchEvent;
