import { List, ListItem } from "@react-md/list";
import {
  ChevronRightSVGIcon,
  InfoSVGIcon,
  MenuSVGIcon,
  PlaceSVGIcon,
  SettingsSVGIcon,
} from "@react-md/material-icons";
import { Menu, MenuItem, MenuItemSeparator, useMenu } from "@react-md/menu";
import { BOTTOM_RIGHT_ANCHOR, useToggle } from "@react-md/utils";
import { useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { DEFAULT_WORLD, useLocationState } from "../../services/location-state";
import { InfoDialog } from "../InfoDialog";
import { ListItemState } from "../ListItemState";
import { SettingsDialog } from "../SettingsDialog";
import { BrowserExtensionItem } from "./BrowserExtensionItem";
import { DonateButton } from "./DonateButton";
import { StravaButton } from "./StravaButton";

interface Props {
  onBottomSheetClose: () => void;
}

export function MenuButton({ onBottomSheetClose }: Props) {
  const state = useLocationState();
  const [visible, setVisible] = useState(false);
  const { menuRef, menuProps, toggleRef, toggleProps } = useMenu<HTMLLIElement>(
    {
      baseId: "sidebar-menu",
      visible,
      setVisible,
      anchor: BOTTOM_RIGHT_ANCHOR,
    },
  );
  const [settingsDialogVisible, showSettingsDialog, hideSettingsDialog] =
    useToggle(false);
  const [infoDialogVisible, showInfoDialog, hideInfoDialog] = useToggle(false);

  const isMobile = useIsMobile();

  return (
    <>
      <ListItem
        ref={toggleRef}
        rightAddon={isMobile ? <MenuSVGIcon /> : <ChevronRightSVGIcon />}
        rightAddonType="icon"
        {...toggleProps}
      >
        Menu
      </ListItem>

      <Menu ref={menuRef} {...menuProps} portal>
        <ListItemState
          state={{ type: "place-new", world: state.world ?? DEFAULT_WORLD }}
          leftAddon={<PlaceSVGIcon />}
          leftAddonType="icon"
        >
          Submit a place
        </ListItemState>
        <StravaButton />
        <MenuItemSeparator />
        <List>
          <MenuItem
            onClick={() => {
              showInfoDialog();
              onBottomSheetClose();
            }}
            leftAddon={<InfoSVGIcon />}
            leftAddonType="icon"
          >
            Info
          </MenuItem>
          <BrowserExtensionItem />
          <DonateButton />
          <MenuItem
            onClick={() => {
              showSettingsDialog();
              onBottomSheetClose();
            }}
            leftAddon={<SettingsSVGIcon />}
            leftAddonType="icon"
          >
            Settings
          </MenuItem>
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
