import { Button } from "@react-md/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@react-md/dialog";
import { Select } from "@react-md/form";
import { ArrowDropDownSVGIcon } from "@react-md/material-icons";
import React from "react";
import { Sport } from "zwift-data";
import { useSettings } from "../../hooks/useSettings";
import { Settings, Units } from "../../types";
import { StravaSettings } from "./StravaSettings";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function SettingsDialog({ visible, onClose }: Props) {
  const [settings, setSettings] = useSettings();

  const handleSportChange = (sport: string) => {
    setSettings({ ...settings, sport: sport as Sport });
  };

  const handleUnitsChange = (units: string) => {
    setSettings({ ...settings, units: units as Units });
  };

  const handleThemeChange = (theme: string) => {
    setSettings({ ...settings, theme: theme as Settings["theme"] });
  };

  return (
    <Dialog
      id="settings-dialog"
      aria-labelledby="settings-dialog-title"
      visible={visible}
      onRequestClose={onClose}
    >
      <DialogHeader style={{ paddingBottom: 0 }}>
        <DialogTitle id="settings-dialog-title">Settings</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <Select
          id="settings-dialog-sport"
          label="Sport"
          value={settings.sport}
          onChange={handleSportChange}
          listboxStyle={{ zIndex: 3000 }}
          style={{ marginBottom: "1rem" }}
          options={[
            { label: "Cycling", value: "cycling" },
            { label: "Running", value: "running" },
          ]}
          rightChildren={<ArrowDropDownSVGIcon />}
        />

        <Select
          id="settings-dialog-units"
          label="Units"
          value={settings.units}
          onChange={handleUnitsChange}
          listboxStyle={{ zIndex: 3000 }}
          style={{ marginBottom: "1rem" }}
          options={[
            { label: "Metric", value: "metric" },
            { label: "Imperial", value: "imperial" },
          ]}
          rightChildren={<ArrowDropDownSVGIcon />}
        />

        <Select
          id="settings-dialog-theme"
          label="Theme"
          value={settings.theme}
          onChange={handleThemeChange}
          listboxStyle={{ zIndex: 3000 }}
          style={{ marginBottom: "1rem" }}
          options={[
            { label: "System", value: "system" },
            { label: "Light", value: "light" },
            { label: "Dark", value: "dark" },
          ]}
          rightChildren={<ArrowDropDownSVGIcon />}
        />

        <StravaSettings />
      </DialogContent>
      <DialogFooter>
        <Button id="dialog-close" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
