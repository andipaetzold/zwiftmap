import { Switch } from "@react-md/form";
import { Typography } from "@react-md/typography";
import { useStravaSettings } from "../../react-query";
import { StravaSettings as StravaSettingsType } from "../../types";

const DEFAULT_STRAVA_SETTINGS: StravaSettingsType = {
  addLinkToActivityDescription: false,
};

export function StravaSettings() {
  const [settings, setSettings] = useStravaSettings();

  return (
    <>
      <Switch
        id="settings-strava-add-link"
        label="Automatically add ZwiftMap links to Strava activities"
        checked={
          settings?.addLinkToActivityDescription ??
          DEFAULT_STRAVA_SETTINGS.addLinkToActivityDescription
        }
        disabled={settings === null}
        onChange={(e) =>
          setSettings({
            ...settings,
            addLinkToActivityDescription: e.target.checked,
          })
        }
      />

      {settings === null && (
        <Typography type="body-2">
          Some options require you to be logged in via Strava.
        </Typography>
      )}
    </>
  );
}
