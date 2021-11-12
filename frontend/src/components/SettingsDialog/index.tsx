import { Button } from "@react-md/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@react-md/dialog";
import { NativeSelect } from "@react-md/form";
import React, { ChangeEvent } from "react";
import { Sport } from "zwift-data";
import { useSettings } from "../../hooks/useSettings";
import { Settings } from "../../types";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function SettingsDialog({ visible, onClose }: Props) {
  const [settings, setSettings] = useSettings();

  const handleSportChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSettings({ ...settings, sport: e.target.value as Sport });
  };

  const handleUnitsChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSettings({ ...settings, units: e.target.value as Settings["units"] });
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
        <NativeSelect
          id="settings-dialog-sport"
          label="Sport"
          value={settings.sport}
          onChange={handleSportChange}
          style={{ marginBottom: "1rem" }}
        >
          <option value="cycling">Cycling</option>
          <option value="running">Running</option>
        </NativeSelect>

        <NativeSelect
          id="settings-dialog-Units"
          label="Units"
          value={settings.sport}
          onChange={handleUnitsChange}
        >
          <option value="metric">Metric</option>
          <option value="imperial">Imperial</option>
        </NativeSelect>
      </DialogContent>
      <DialogFooter>
        <Button id="dialog-close" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
