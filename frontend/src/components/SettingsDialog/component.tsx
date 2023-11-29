import { Button } from "@react-md/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@react-md/dialog";
import { Select, Switch } from "@react-md/form";
import { ArrowDropDownSVGIcon } from "@react-md/material-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { worlds } from "zwift-data";
import { useSettings } from "../../hooks/useSettings";
import { queries, useAuthStatus } from "../../react-query";
import { StravaSettings } from "./StravaSettings";
import styles from "./styles.module.scss";

interface Props {
  onClose: () => void;
}

export default function SettingsDialog({ onClose }: Props) {
  const store = useSettings();
  const queryClient = useQueryClient();
  const { data: authStatus } = useAuthStatus();
  const canViewUnverified =
    (authStatus?.adminUser ?? false) || (authStatus?.moderatorUser ?? false);
  const showUnverifiedPlacesId = useId();

  return (
    <Dialog
      id={useId()}
      aria-labelledby="settings-dialog-title"
      visible={true}
      onRequestClose={onClose}
      type="centered"
      className={styles.Dialog}
    >
      <DialogHeader style={{ paddingBottom: 0 }}>
        <DialogTitle id="settings-dialog-title">Settings</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <Select
          id="settings-dialog-sport"
          label="Sport"
          value={store.sport}
          onChange={store.setSport as (sport: string) => void}
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
          value={store.units}
          onChange={store.setUnits as (units: string) => void}
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
          value={store.theme}
          onChange={store.setTheme as (theme: string) => void}
          listboxStyle={{ zIndex: 3000 }}
          style={{ marginBottom: "1rem" }}
          options={[
            { label: "System", value: "system" },
            { label: "Light", value: "light" },
            { label: "Dark", value: "dark" },
          ]}
          rightChildren={<ArrowDropDownSVGIcon />}
        />

        {canViewUnverified && (
          <Switch
            id={showUnverifiedPlacesId}
            label="Show unverified places"
            checked={store.showUnverifiedPlaces}
            onChange={(e) => {
              store.setShowUnverifiedPlaces(e.target.checked);
              queryClient.invalidateQueries({ queryKey: queries.placesBase });
              for (const world of worlds) {
                queryClient.invalidateQueries({
                  queryKey: queries.worldPlacesBase(world.slug),
                });
              }
            }}
          />
        )}

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
