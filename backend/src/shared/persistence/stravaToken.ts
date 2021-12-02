import { StravaTokenModel } from "./models";
import { redisClient } from "./redis";
import { StravaToken } from "./types";

function createKey(athleteId: number): string {
  return `stravaToken:${athleteId}`;
}

export async function writeStravaToken(stravaToken: StravaToken) {
  await StravaTokenModel.bulkCreate([stravaToken], {
    updateOnDuplicate: ["token", "refreshToken", "expiresAt", "scope"],
  });

  // TODO: remove after migration
  const key = createKey(stravaToken.athleteId);
  await redisClient.del(key);
}

export async function readStravaToken(
  athleteId: number
): Promise<StravaToken | undefined> {
  let result: any;
  try {
    result = await StravaTokenModel.findByPk(athleteId);
  } catch (e) {
    console.error(e);
  }

  if (result === null) {
    const token = await redisClient.get<StravaToken>(createKey(athleteId));
    if (token) {
      await writeStravaToken(token);
    }
    return token;
  }

  return result.get({ plain: true });
}

export async function removeStravaToken(athleteId: number): Promise<void> {
  await StravaTokenModel.destroy({ where: { athleteId } });

  // TODO: remove after migration
  await redisClient.del(createKey(athleteId));
}
