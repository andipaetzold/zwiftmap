import { AsyncSwitch } from "@react-md/form";
import { ListSubheader, SimpleListItem } from "@react-md/list";
import { Typography } from "@react-md/typography";
import { useId } from "react";
import {
  useStravaSettings,
  useUpdateStravaSettings,
} from "../../../../react-query";

export function EnableActivityPersistence() {
  const [settings] = useStravaSettings();
  const id = useId();
  const { mutate: updateSettings, isPending } = useUpdateStravaSettings();

  if (!settings || settings.persistActivities) {
    return null;
  }

  return (
    <>
      <ListSubheader>Missing permissions</ListSubheader>
      <SimpleListItem style={{ paddingBottom: 0 }}>
        <AsyncSwitch
          id={id}
          loading={isPending}
          label="Allow ZwiftMap to save and process activities"
          onChange={(e) =>
            updateSettings({ ...settings, persistActivities: e.target.checked })
          }
        />
      </SimpleListItem>
      <SimpleListItem>
        <Typography type="body-2" style={{ marginBottom: 0, marginTop: 0 }}>
          New activities will be stored on ZwiftMap servers. They will be
          deleted automatically when you revoke ZwiftMap&apos;s access to your
          Strava account. The persisted data is not accessible by any other
          person.
        </Typography>
      </SimpleListItem>
    </>
  );
}
