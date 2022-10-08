import { ExitToAppSVGIcon } from "@react-md/material-icons";
import { MenuItem, MenuItemLink } from "@react-md/menu";
import ConnectToStrava from "../../../assets/ConnectToStravaLight.svg";
import { useIsLoggedInStrava } from "../../../hooks/useIsLoggedInStrava";
import { useAuthLogout } from "../../../react-query";
import { useStravaAuthUrl } from "../../../services/strava/auth";
import styles from "./index.module.scss";

export function StravaButton() {
  const isStravaLoggedIn = useIsLoggedInStrava();
  const stravaAuthUrl = useStravaAuthUrl();
  const { mutate } = useAuthLogout();

  if (isStravaLoggedIn) {
    return (
      <MenuItem leftAddon={<ExitToAppSVGIcon />} onClick={() => mutate()}>
        Logout
      </MenuItem>
    );
  }

  return (
    <MenuItemLink href={stravaAuthUrl} className={styles.LoginItem}>
      <img src={ConnectToStrava} alt="Connect to Strava" />
    </MenuItemLink>
  );
}
