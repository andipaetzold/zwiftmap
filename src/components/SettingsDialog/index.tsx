import { Button } from "@react-md/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@react-md/dialog";
import { Fieldset, Radio } from "@react-md/form";
import React, { ChangeEvent } from "react";
import { useSettings } from "../../hooks/useSettings";
import { Sport } from "../../types";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function SettingsDialog({ visible, onClose }: Props) {
  const [settings, setSettings] = useSettings();

  const handleSportChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSettings({ ...settings, sport: e.target.value as Sport });
    }
  };
  return (
    <Dialog
      id="settings-dialog"
      aria-labelledby="settings-dialog-title"
      visible={visible}
      onRequestClose={onClose}
    >
      <DialogHeader>
        <DialogTitle id="settings-dialog-title">Settings</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <Fieldset legend="Sport">
          <Radio
            id="settings-dialog-cycling"
            name="settings-dialog-sport"
            label="Cycling"
            value="cycling"
            checked={settings.sport === "cycling"}
            onChange={handleSportChange}
          />
          <Radio
            id="settings-dialog-running"
            name="settings-dialog-sport"
            label="Running"
            value="running"
            checked={settings.sport === "running"}
            onChange={handleSportChange}
          />
        </Fieldset>
      </DialogContent>
      <DialogFooter>
        <Button id="dialog-close" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
