import { Switch } from "@react-md/form";
import { Typography } from "@react-md/typography";
import { useId } from "react";
import { ENVIRONMENT } from "../../config";
import { useStravaSettings } from "../../react-query";
import { StravaSettings as StravaSettingsType } from "../../types";

const DEFAULT_STRAVA_SETTINGS: StravaSettingsType = {
  addLinkToActivityDescription: false,
  saveActivities: false,
};

export function StravaSettings() {
  const [settings, setSettings] = useStravaSettings();

  const saveActivitiesId = useId();

  return (
    <>
      <Switch
        id={useId()}
        label="Automatically add ZwiftMap links to Strava activities"
        checked={
          settings?.addLinkToActivityDescription ??
          DEFAULT_STRAVA_SETTINGS.addLinkToActivityDescription
        }
        disabled={settings === null}
        onChange={(e) => {
          if (!settings) {
            return;
          }

          setSettings({
            ...settings,
            addLinkToActivityDescription: e.target.checked,
          });
        }}
      />

      {ENVIRONMENT === "development" && (
        <Switch
          id={saveActivitiesId}
          label="Allow ZwiftMap to save and process activities"
          checked={
            settings?.saveActivities ?? DEFAULT_STRAVA_SETTINGS.saveActivities
          }
          disabled={settings === null}
          onChange={(e) => {
            if (!settings) {
              return;
            }

            setSettings({
              ...settings,
              saveActivities: e.target.checked,
            });
          }}
        />
      )}

      {settings === null && (
        <Typography type="body-2">
          Some options require you to be logged in via Strava.
        </Typography>
      )}
    </>
  );
}
