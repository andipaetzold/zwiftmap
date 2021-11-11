import { SimpleListItem } from "@react-md/list";
import { CircularProgress } from "@react-md/progress";

interface Props {
  small?: boolean;
}

export function LoadingSpinner({ small }: Props) {
  return (
    <CircularProgress
      id={Date.now().toString()}
      circleStyle={{ stroke: "black" }}
      small={small}
    />
  );
}

export function LoadingSpinnerListItem({ small }: Props) {
  return (
    <SimpleListItem>
      <LoadingSpinner small={small} />
    </SimpleListItem>
  );
}
