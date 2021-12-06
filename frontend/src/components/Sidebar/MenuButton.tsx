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
import React, { useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { InfoDialog } from "../InfoDialog";
import { SettingsDialog } from "../SettingsDialog";
import { StravaButton } from "./StravaButton";

interface Props {
  onBottomSheetClose: () => void;
}

export function MenuButton({ onBottomSheetClose }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsDialogVisible, showSettingsDialog, hideSettingsDialog] =
    useToggle(false);
  const [infoDialogVisible, showInfoDialog, hideInfoDialog] = useToggle(false);

  const isMobile = useIsMobile();

  return (
    <>
      <ListItem
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen(!menuOpen);
        }}
        rightAddon={isMobile ? <MenuFontIcon /> : <ChevronRightFontIcon />}
        rightAddonType="icon"
        id="sidebar-menu-button"
        aria-haspopup="true"
        aria-expanded={menuOpen}
        aria-controls="sidebar-menu"
      >
        Menu
      </ListItem>

      <Menu
        id="sidebar-menu"
        controlId="sidebar-menu-button"
        aria-labelledby="sidebar-menu-button"
        visible={menuOpen}
        onRequestClose={() => setMenuOpen(false)}
        anchor={BOTTOM_RIGHT_ANCHOR}
        portal
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
          <StravaButton />
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
