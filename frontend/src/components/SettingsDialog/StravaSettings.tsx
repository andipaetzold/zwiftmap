import { Divider } from "@react-md/divider";
import { ExpansionPanel } from "@react-md/expansion-panel";
import { AsyncSwitch } from "@react-md/form";
import { KeyboardArrowDownSVGIcon } from "@react-md/material-icons";
import { Typography } from "@react-md/typography";
import { useId, useState } from "react";
import { useStravaSettings, useUpdateStravaSettings } from "../../react-query";
import { StravaSettings as StravaSettingsType } from "../../types";

const DEFAULT_STRAVA_SETTINGS: StravaSettingsType = {
  addLinkToActivityDescription: false,
  persistActivities: false,
};

export function StravaSettings() {
  const [settings] = useStravaSettings();
  // const { mutate: updateStravaSettings, isPending: isPending1 } =
  //   useUpdateStravaSettings();
  const { mutate: update, isPending: isPending2 } = useUpdateStravaSettings();
  const [footnotesExpanded, setFootnotesExpanded] = useState(false);

  return (
    <>
      {/* <AsyncSwitch
        id={useId()}
        label={
          <>
            Automatically add ZwiftMap links to Strava activities&nbsp;
            <sup>1</sup>
          </>
        }
        aria-label="Automatically add ZwiftMap links to Strava activities"
        checked={
          settings?.addLinkToActivityDescription ??
          DEFAULT_STRAVA_SETTINGS.addLinkToActivityDescription
        }
        disabled={settings === null}
        loading={isPending1}
        onChange={(e) => {
          if (!settings) {
            return;
          }

          updateStravaSettings({
            ...settings,
            addLinkToActivityDescription: e.target.checked,
          });
        }}
      /> */}

      <AsyncSwitch
        id={useId()}
        label={
          <>
            Allow ZwiftMap to save and process activities&nbsp;<sup>1</sup>
          </>
        }
        aria-label="Allow ZwiftMap to save and process activities"
        checked={
          settings?.persistActivities ??
          DEFAULT_STRAVA_SETTINGS.persistActivities
        }
        disabled={settings === null}
        loading={isPending2}
        onChange={(e) => {
          if (!settings) {
            return;
          }

          update({
            ...settings,
            persistActivities: e.target.checked,
          });
        }}
      />

      {settings === null && (
        <Typography type="body-2">
          Some options require you to be logged in via Strava.
        </Typography>
      )}

      <Divider />
      <ExpansionPanel
        id={useId()}
        expanded={footnotesExpanded}
        onExpandClick={() => setFootnotesExpanded(!footnotesExpanded)}
        header="Footnotes"
        expanderIcon={<KeyboardArrowDownSVGIcon />}
      >
        <Typography type="body-1" component="div">
          <ol>
            {/* <li>
              New activities are stored on ZwiftMap servers. The data won&apos;t
              be deleted when you revoke ZwiftMap&apos;s access to your Strava
              account to ensure the links stay valid. If you still want to
              remove all your data, please reach out to{" "}
              <Link href="mailto:support@zwiftmap.com">
                support@zwiftmap.com
              </Link>
              . The stored activities are accessible for anyone via the shared
              link in your Strava activity description.
            </li> */}
            <li>
              New activities are stored on ZwiftMap servers. They will be
              deleted automatically when you revoke ZwiftMap&apos;s access to
              your Strava account. The persisted data is not accessible by any
              other person.
            </li>
          </ol>
        </Typography>
      </ExpansionPanel>
    </>
  );
}
