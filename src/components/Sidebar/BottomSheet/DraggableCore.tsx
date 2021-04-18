import * as React from "react";
import { ReactElement } from "react";
import { getTouchIdentifier } from "./utils/domFns";
import { createCoreData, getControlPosition } from "./utils/positionFns";
import type { Bounds, EventHandler, MouseTouchEvent } from "./utils/types";

const eventsFor = {
  touch: {
    start: "touchstart",
    move: "touchmove",
    stop: "touchend",
  },
  mouse: {
    start: "mousedown",
    move: "mousemove",
    stop: "mouseup",
  },
};

interface State {
  dragging: boolean;
  lastY: number;
  touchIdentifier: number | undefined;
}

export type DraggableData = {
  node: HTMLElement;
  y: number;
  deltaY: number;
  lastY: number;
};

interface Props {
  onStart: () => void;
  onDrag: (data: DraggableData) => void | false;
  onStop: () => void | false;
  bounds: Bounds;
  children: ReactElement<any>;
  nodeRef: React.MutableRefObject<HTMLDivElement | null>;
}

export default class DraggableCore extends React.Component<Props, State> {
  dragEventFor = eventsFor.mouse;

  state: State = {
    dragging: false,
    lastY: NaN,
    touchIdentifier: undefined,
  };

  mounted: boolean = false;

  componentDidMount() {
    this.mounted = true;

    if (this.props.nodeRef.current) {
      addEvent(
        this.props.nodeRef.current,
        eventsFor.touch.start,
        this.onTouchStart,
        {
          passive: false,
        }
      );
    }
  }

  componentWillUnmount() {
    this.mounted = false;

    if (this.props.nodeRef.current) {
      const { ownerDocument } = this.props.nodeRef.current;
      removeEvent(ownerDocument, eventsFor.mouse.move, this.handleDrag);
      removeEvent(ownerDocument, eventsFor.touch.move, this.handleDrag);
      removeEvent(ownerDocument, eventsFor.mouse.stop, this.handleDragStop);
      removeEvent(ownerDocument, eventsFor.touch.stop, this.handleDragStop);
      removeEvent(this.props.nodeRef.current, eventsFor.touch.start, this.onTouchStart, {
        passive: false,
      });
    }
  }

  handleDragStart: EventHandler<MouseTouchEvent> = (e) => {
    if (typeof e.button === "number" && e.button !== 0) {
      return false;
    }

    this.props.onStart();

    const touchIdentifier = getTouchIdentifier(e);
    this.setState({
      touchIdentifier,
      dragging: true,
      lastY: getControlPosition(e, touchIdentifier)!,
    });

    addEvent(document, this.dragEventFor.move, this.handleDrag);
    addEvent(document, this.dragEventFor.stop, this.handleDragStop);
  };

  handleDrag: EventHandler<MouseTouchEvent> = (e) => {
    const y = getControlPosition(e, this.state.touchIdentifier);
    if (y == null) {
      return;
    }

    const coreEvent = createCoreData(this, y);

    const shouldUpdate = this.props.onDrag(coreEvent);
    if (shouldUpdate === false || this.mounted === false) {
      // @ts-ignore
      this.handleDragStop(new MouseEvent("mouseup"));
    } else {
      this.setState({
        lastY: y,
      });
    }
  };

  handleDragStop: EventHandler<MouseTouchEvent> = (e) => {
    if (!this.state.dragging) {
      return;
    }

    const y = getControlPosition(e, this.state.touchIdentifier!);
    if (y === null) {
      return;
    }

    const shouldContinue = this.props.onStop();
    if (shouldContinue === false || this.mounted === false) {
      return false;
    }

    this.setState({
      dragging: false,
      lastY: NaN,
    });

    const thisNode = this.props.nodeRef.current;
    if (thisNode) {
      removeEvent(
        thisNode.ownerDocument,
        this.dragEventFor.move,
        this.handleDrag
      );
      removeEvent(
        thisNode.ownerDocument,
        this.dragEventFor.stop,
        this.handleDragStop
      );
    }
  };

  onMouseDown: EventHandler<MouseTouchEvent> = (e) => {
    this.dragEventFor = eventsFor.mouse;
    return this.handleDragStart(e);
  };

  onMouseUp: EventHandler<MouseTouchEvent> = (e) => {
    this.dragEventFor = eventsFor.mouse;
    return this.handleDragStop(e);
  };

  onTouchStart: EventHandler<MouseTouchEvent> = (e) => {
    this.dragEventFor = eventsFor.touch;
    return this.handleDragStart(e);
  };

  onTouchEnd: EventHandler<MouseTouchEvent> = (e) => {
    this.dragEventFor = eventsFor.touch;
    return this.handleDragStop(e);
  };

  render(): ReactElement<any> {
    return React.cloneElement(React.Children.only(this.props.children), {
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      onTouchEnd: this.onTouchEnd,
    });
  }
}

function addEvent(
  el: Node,
  event: string,
  handler: any,
  inputOptions: AddEventListenerOptions = {}
): void {
  el.addEventListener(event, handler, { capture: true, ...inputOptions });
}

function removeEvent(
  el: Node,
  event: string,
  handler: any,
  inputOptions: AddEventListenerOptions = {}
): void {
  el.removeEventListener(event, handler, { capture: true, ...inputOptions });
}
