import * as React from "react";
import { MutableRefObject, ReactElement } from "react";
import DraggableCore from "./DraggableCore";
import { getBoundPosition } from "./utils/positionFns";
import type { Bounds, DraggableData } from "./utils/types";

interface State {
  dragging: boolean;
  y: number;
  slackY: number;
}

interface Props {
  defaultPosition: number;
  disabled?: boolean;
  bounds: Bounds;
  children: ReactElement;
  nodeRef: MutableRefObject<HTMLDivElement | null>;
}

export default class Draggable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      dragging: false,
      y: props.defaultPosition,
      slackY: 0,
    };
  }

  componentWillUnmount() {
    this.setState({ dragging: false });
  }

  static getDerivedStateFromProps(
    props: Props,
    state: State
  ): Partial<State> | null {
    const y = getBoundPosition(props.bounds, state.y);
    if (y !== state.y) {
      return {
        y,
        slackY: 0,
      };
    } else {
      return null;
    }
  }

  onDragStart = () => {
    this.setState({ dragging: true });
  };

  onDrag = (coreData: DraggableData): false | void => {
    if (!this.state.dragging) {
      return false;
    }

    const y = this.state.y + coreData.deltaY;
    const newStateY = getBoundPosition(
      this.props.bounds,
      y + this.state.slackY
    );

    this.setState({
      y: newStateY,
      slackY: this.state.slackY + (y - newStateY),
    });
  };

  onDragStop = () => {
    if (!this.state.dragging) {
      return false;
    }

    this.setState({ dragging: false, slackY: 0 });
  };

  render() {
    const {
      children,
      defaultPosition,
      disabled,
      ...draggableCoreProps
    } = this.props;

    if (disabled) {
      return children;
    } else {
      return (
        <DraggableCore
          {...draggableCoreProps}
          onStart={this.onDragStart}
          onDrag={this.onDrag}
          onStop={this.onDragStop}
        >
          {React.cloneElement(React.Children.only(children), {
            style: {
              ...children.props.style,
              transform: `translate(0, ${this.state.y}px)`,
              willChange: "transform",
            },
          })}
        </DraggableCore>
      );
    }
  }
}
