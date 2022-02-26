import { redisClient } from "../shared/persistence/redis";
import {
  readStravaToken,
  writeStravaToken,
} from "../shared/persistence/stravaToken";

export async function migrateStravaToken() {
  console.log("Migrating Strava tokens from redis to PostgreSQL");

  const stravaTokenKeys = await redisClient.keys("stravaToken:*");

  console.log(`Athlete count: ${stravaTokenKeys.length}`);

  for (const stravaTokenKey of stravaTokenKeys) {
    const athleteId = stravaTokenKey.split(":")[1];

    console.log(`Athlete: ${athleteId}`);
    const stravaToken = await readStravaToken(+athleteId);
    if (!stravaToken) {
      console.log("Not found");
      continue;
    }
    await writeStravaToken(stravaToken);
    console.log("Migrated");
  }
}
