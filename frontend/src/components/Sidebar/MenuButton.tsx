import { Divider } from "@react-md/divider";
import { List, ListItem } from "@react-md/list";
import {
  ChevronRightFontIcon,
  InfoFontIcon,
  MenuFontIcon,
  SettingsFontIcon,
} from "@react-md/material-icons";
import { Menu, MenuItem } from "@react-md/menu";
import { BOTTOM_RIGHT_ANCHOR, useToggle } from "@react-md/utils";
import React, { useRef, useState } from "react";
import { useIsLoggedInStrava } from "../../hooks/useIsLoggedInStrava";
import { useIsMobile } from "../../hooks/useIsMobile";
import { openStravaAuthUrl } from "../../services/strava/auth";
import { removeStravaToken } from "../../services/strava/token";
import { InfoDialog } from "../InfoDialog";
import { SettingsDialog } from "../SettingsDialog";
import styles from "./MenuButton.module.scss";

interface Props {
  onBottomSheetClose: () => void;
}

export function MenuButton({ onBottomSheetClose }: Props) {
  const buttonRef = useRef<HTMLLIElement | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [settingsDialogVisible, showSettingsDialog, hideSettingsDialog] =
    useToggle(false);
  const [infoDialogVisible, showInfoDialog, hideInfoDialog] = useToggle(false);

  const isMobile = useIsMobile();
  const isStravaLoggedIn = useIsLoggedInStrava();

  return (
    <>
      <ListItem
        onClick={(e) => {
          e.stopPropagation();
          setMenuVisible(!menuVisible);
        }}
        rightAddon={isMobile ? <MenuFontIcon /> : <ChevronRightFontIcon />}
        rightAddonType="icon"
        id="sidebar-menu"
        ref={buttonRef}
      >
        Menu
      </ListItem>

      <Menu
        id="sidebar-menu"
        controlId="sidebar-menu"
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
        aria-labelledby="sidebar-menu"
        anchor={BOTTOM_RIGHT_ANCHOR}
        portal
        className={styles.Menu}
      >
        <List>
          <MenuItem
            onClick={() => {
              showInfoDialog();
              onBottomSheetClose();
            }}
            leftAddon={<InfoFontIcon />}
            leftAddonType="icon"
          >
            Info
          </MenuItem>
          <MenuItem
            onClick={() => {
              showSettingsDialog();
              onBottomSheetClose();
            }}
            leftAddon={<SettingsFontIcon />}
            leftAddonType="icon"
          >
            Settings
          </MenuItem>
          <Divider />
          {isStravaLoggedIn ? (
            <MenuItem
              onClick={() => {
                removeStravaToken();
              }}
            >
              Logout from Strava
            </MenuItem>
          ) : (
            <MenuItem onClick={openStravaAuthUrl}>Login to Strava</MenuItem>
          )}
        </List>
      </Menu>

      <SettingsDialog
        visible={settingsDialogVisible}
        onClose={hideSettingsDialog}
      />

      <InfoDialog visible={infoDialogVisible} onClose={hideInfoDialog} />
    </>
  );
}
