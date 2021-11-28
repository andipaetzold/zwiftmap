import { buttonThemeClassNames, ButtonThemeProps } from "@react-md/button";
import { Link, LinkProps } from "@react-md/link";
import c from "classnames";
import { useCallback } from "react";
import { useStore } from "../../hooks/useStore";
import {
  createUrl,
  LocationState,
  useLocationState,
} from "../../services/location-state";
import styles from "./index.module.scss";

type Props = { state: LocationState; query?: string } & ButtonThemeProps &
  LinkProps;

export function ButtonState({
  className,
  theme,
  themeType,
  buttonType,
  disabled,
  state,
  query,
  ...props
}: Props) {
  const [, setLocationState] = useLocationState();
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
        setLocationState(state);
      }
    },
    [query, setLocationState, setQuery, state]
  );

  return (
    <Link
      {...props}
      className={buttonThemeClassNames({
        disabled,
        theme,
        themeType,
        buttonType,
        className: c(styles.link, className),
      })}
      onClick={handleClick}
      href={createUrl(state)}
    />
  );
}

/**
 * @see https://github.com/remix-run/react-router/blob/91a52f822d292c4ef017e6c252b32b9ebd57c9c2/packages/react-router-dom/index.tsx#L197-L199
 */
function isModifiedEvent(event: React.MouseEvent) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
