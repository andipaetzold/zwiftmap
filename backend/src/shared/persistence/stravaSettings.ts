import { StravaSettingsModel } from "./models";
import { redisClient } from "./redis";
import { StravaSettingsType } from "./types";

function createKey(athleteId: number): string {
  return `strava-settings:${athleteId}`;
}

export async function writeStravaSettings(
  athleteId: number,
  settings: StravaSettingsType
) {
  await StravaSettingsModel.bulkCreate(
    [
      {
        athleteId,
        addLinkToActivityDescription: settings.addLinkToActivityDescription,
      },
    ],
    {
      updateOnDuplicate: ["addLinkToActivityDescription"],
    }
  );

  // TODO: remove after migration
  const key = createKey(athleteId);
  redisClient.del(key);
}

export async function readStravaSettings(
  athleteId: number
): Promise<StravaSettingsType> {
  const result = await StravaSettingsModel.findByPk(athleteId);

  if (result === null) {
    // TODO: remove after migration
    const settings = await redisClient.get(createKey(athleteId));
    if (!settings) {
      return {
        addLinkToActivityDescription: false,
      };
    }
    await writeStravaSettings(athleteId, settings);
    return settings;
  }

  return {
    addLinkToActivityDescription: result.getDataValue(
      "addLinkToActivityDescription"
    ),
  };
}

export async function removeStravaSettings(athleteId: number): Promise<void> {
  await StravaSettingsModel.destroy({
    where: { athleteId },
  });

  // TODO: remove after migration
  await redisClient.del(createKey(athleteId));
}
