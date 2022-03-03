import { lazy, Suspense } from "react";

const Component = lazy(() => import("./component"));

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function InfoDialog({ visible, onClose }: Props) {
  if (visible) {
    return (
      <Suspense fallback={null}>
        <Component onClose={onClose} />
      </Suspense>
    );
  }

  return null;
}
