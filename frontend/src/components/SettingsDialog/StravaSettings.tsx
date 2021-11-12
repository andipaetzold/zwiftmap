import { Switch } from "@react-md/form";
import { useStravaSettings } from "../../hooks/useStravaSettings";

export function StravaSettings() {
  const [settings, setSettings] = useStravaSettings();

  if (settings === null) {
    return null;
  }

  return (
    <>
      <Switch
        id="settings-strava-add-link"
        label="Add link to activity description"
        checked={settings.addLinkToActivityDescription}
        onChange={(e) =>
          setSettings({
            ...settings,
            addLinkToActivityDescription: e.target.checked,
          })
        }
      />
    </>
  );
}
