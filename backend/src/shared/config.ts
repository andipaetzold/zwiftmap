import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import { config as dotenvConfig } from "dotenv";

export interface Config {
  environment: "development" | "production";
  backendUrl: string;
  frontendUrl: string;
  strava: {
    clientId: number;
    clientSecret: string;
    webhookHost: string;
    verifyToken: string;
    betaUsers: number[];
  };
  sentry: {
    dsn: string;
    version: string;
  };
  auth: {
    secret: string;
    cookieName: string;
  };
}

async function getConfig(): Promise<Config> {
  if (process.env.GCP_PROJECT) {
    return {
      environment: "production",
      backendUrl: process.env.BACKEND_URL!,
      frontendUrl: process.env.FRONTEND_URL!,
      strava: {
        clientId: +process.env.STRAVA_CLIENT_ID!,
        clientSecret: await getSecret("GAE_STRAVA_CLIENT_SECRET"),
        webhookHost: process.env.BACKEND_URL!,
        verifyToken: await getSecret("GAE_STRAVA_VERIFY_TOKEN"),
        betaUsers: process.env
          .STRAVA_BETA_USERS!.split(",")
          .map((userId) => +userId)
          .filter((userId) => !Number.isNaN(userId)),
      },
      sentry: {
        dsn: await getSecret("GAE_SENTRY_DSN"),
        version: process.env.K_REVISION!,
      },
      auth: {
        secret: await getSecret("GAE_AUTH_SECRET"),
        cookieName: "sessionID",
      },
    };
  } else {
    dotenvConfig();

    return {
      environment: "development",
      backendUrl: process.env.BACKEND_URL!,
      frontendUrl: process.env.FRONTEND_URL!,
      strava: {
        clientId: +process.env.STRAVA_CLIENT_ID!,
        clientSecret: process.env.STRAVA_CLIENT_SECRET!,
        webhookHost:
          process.env.STRAVA_WEBHOOK_HOST ?? process.env.BACKEND_URL!,
        verifyToken: "token",
        betaUsers: process.env
          .STRAVA_BETA_USERS!.split(",")
          .map((userId) => +userId)
          .filter((userId) => !Number.isNaN(userId)),
      },
      sentry: {
        dsn: "",
        version: "unknown",
      },
      auth: {
        secret: process.env.AUTH_SECRET!,
        cookieName: "sessionID",
      },
    };
  }
}

const client = new SecretManagerServiceClient();
async function getSecret(name: string): Promise<string> {
  const [version] = await client.accessSecretVersion({
    name: client.secretVersionPath(process.env.GCP_PROJECT!, name, "latest"),
  });
  const payload = version.payload?.data?.toString();

  if (!payload) {
    throw new Error(`Could not find secret '${name}'`);
  }
  return payload;
}

export const config = await getConfig();
