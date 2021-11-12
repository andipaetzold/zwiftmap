import { Boolean, Record, Static } from "runtypes";
import { read, remove, write } from "./redis";

export const StravaSettings = Record({
  addLinkToActivityDescription: Boolean,
});

export type StravaSettingsType = Static<typeof StravaSettings>;

function createKey(athleteId: number): string {
  return `strava-settings:${athleteId}`;
}

export async function writeStravaSettings(
  athleteId: number,
  settings: StravaSettingsType
) {
  const key = createKey(athleteId);
  await write(key, settings);
}

export async function readStravaSettings(
  athleteId: number
): Promise<StravaSettingsType> {
  const settings = await read(createKey(athleteId));
  if (!settings) {
    return {
      addLinkToActivityDescription: false,
    };
  }
  return settings;
}

export async function removeStravaSettings(athleteId: number): Promise<void> {
  return await remove(createKey(athleteId));
}
