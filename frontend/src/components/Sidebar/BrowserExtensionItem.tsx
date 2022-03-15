import { ExtensionSVGIcon, OpenInNewSVGIcon } from "@react-md/material-icons";
import { MenuItemLink } from "@react-md/menu";
import { detect } from "detect-browser";

const CHROME_URL =
  "https://chrome.google.com/webstore/detail/zwiftmap-for-strava/eiaekjobfimlijhpggbbkhoihlchdhdl";
const FIREFOX_URL = "https://addons.mozilla.org/en-US/firefox/addon/zwiftmap/";

export function BrowserExtensionItem() {
  const url = getExtensionUrl();

  if (!url) {
    return null;
  }

  return (
    <MenuItemLink
      leftAddon={<ExtensionSVGIcon />}
      leftAddonType="icon"
      rightAddon={<OpenInNewSVGIcon />}
      rightAddonType="icon"
      href={url}
      target="_blank"
    >
      Browser Extension
    </MenuItemLink>
  );
}

function getExtensionUrl() {
  const browser = detect();

  switch (browser?.name) {
    case "chrome": // includes Brave
    case "edge":
    case "edge-chromium":
      return CHROME_URL;

    case "firefox":
      return FIREFOX_URL;

    default:
      return null;
  }
}
