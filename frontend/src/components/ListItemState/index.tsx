import { ListItemLink, ListItemLinkProps } from "@react-md/list";
import { useCallback } from "react";
import { useStore } from "../../hooks/useStore";
import {
  createUrl,
  LocationState,
  navigate,
} from "../../services/location-state";

type Props = Omit<ListItemLinkProps, "href" | "target"> & {
  state: LocationState;
  query?: string;
};

export function ListItemState({
  state,
  query,
  children,
  onClick,
  ...props
}: Props) {
  const setQuery = useStore((state) => state.setQuery);
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      // https://github.com/remix-run/react-router/blob/91a52f822d292c4ef017e6c252b32b9ebd57c9c2/packages/react-router-dom/index.tsx#L349-L353
      if (
        event.button === 0 && // Ignore everything but left clicks
        !isModifiedEvent(event) // Ignore clicks with modifier keys
      ) {
        event.preventDefault();
        if (query !== undefined) {
          setQuery(query);
        }
        navigate(state);
        onClick?.(event);
      }
    },
    [query, setQuery, state, onClick],
  );
  return (
    <ListItemLink
      {...props}
      href={createUrl(state)}
      onClick={handleClick}
      primaryText={children}
    />
  );
}

/**
 * @see https://github.com/remix-run/react-router/blob/91a52f822d292c4ef017e6c252b32b9ebd57c9c2/packages/react-router-dom/index.tsx#L197-L199
 */
function isModifiedEvent(event: React.MouseEvent) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
