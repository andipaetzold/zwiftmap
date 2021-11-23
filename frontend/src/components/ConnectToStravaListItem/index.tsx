import { ListItemLink } from "@react-md/list";
import { OpenInNewFontIcon } from "@react-md/material-icons";
import ConnectToStrava from "../../assets/ConnectToStravaLight.svg";
import { useStravaAuthUrl } from "../../services/strava/auth";

export function ConnectToStravaListItem() {
  const stravaAuthUrl = useStravaAuthUrl();

  return (
    <ListItemLink
      href={stravaAuthUrl}
      rightAddon={<OpenInNewFontIcon />}
      rightAddonType="icon"
    >
      <img
        src={ConnectToStrava}
        alt="Connect to Strava"
        className="rmd-list-item__text"
      />
    </ListItemLink>
  );
}
