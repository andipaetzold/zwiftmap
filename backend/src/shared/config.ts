import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import { config as dotenvConfig } from "dotenv";

export interface Config {
  port: number;
  environment: "development" | "production";
  backendUrl: string;
  frontendUrl: string;
  project: string;
  strava: {
    clientId: number;
    clientSecret: string;
    webhookHost: string;
    verifyToken: string;
  };
  sentry: {
    dsn: string;
    version: string;
  };
  auth: {
    secret: string;
    cookieName: string;
  };
  functions: {
    baseUrl: string;
  };
  tasks: {
    location: string;
  };
  serviceAccount: string;
}

async function getConfig(): Promise<Config> {
  if (process.env.GOOGLE_CLOUD_PROJECT) {
    return {
      port: +process.env.PORT!,
      environment: "production",
      backendUrl: process.env.BACKEND_URL!,
      frontendUrl: process.env.FRONTEND_URL!,
      project: process.env.GOOGLE_CLOUD_PROJECT!,
      serviceAccount: process.env.SERVICE_ACCOUNT!,
      strava: {
        clientId: +process.env.STRAVA_CLIENT_ID!,
        clientSecret: await getSecret("GAE_STRAVA_CLIENT_SECRET"),
        webhookHost: process.env.BACKEND_URL!,
        verifyToken: await getSecret("GAE_STRAVA_VERIFY_TOKEN"),
      },
      sentry: {
        dsn: await getSecret("GAE_SENTRY_DSN"),
        version: process.env.GAE_VERSION!,
      },
      auth: {
        secret: await getSecret("GAE_AUTH_SECRET"),
        cookieName: "sessionID",
      },
      functions: {
        baseUrl: process.env.FUNCTIONS_BASE_URL!,
      },
      tasks: {
        location: process.env.TASKS_LOCATION!,
      },
    };
  } else {
    dotenvConfig();

    return {
      port: +process.env.PORT!,
      environment: "development",
      backendUrl: process.env.BACKEND_URL!,
      frontendUrl: process.env.FRONTEND_URL!,
      project: process.env.GOOGLE_CLOUD_PROJECT!,
      serviceAccount: process.env.SERVICE_ACCOUNT!,
      strava: {
        clientId: +process.env.STRAVA_CLIENT_ID!,
        clientSecret: process.env.STRAVA_CLIENT_SECRET!,
        webhookHost:
          process.env.STRAVA_WEBHOOK_HOST ?? process.env.BACKEND_URL!,
        verifyToken: "token",
      },
      sentry: {
        dsn: "",
        version: "unknown",
      },
      auth: {
        secret: process.env.AUTH_SECRET!,
        cookieName: "sessionID",
      },
      functions: {
        baseUrl: process.env.FUNCTIONS_BASE_URL!,
      },
      tasks: {
        location: process.env.TASKS_LOCATION!,
      },
    };
  }
}

const client = new SecretManagerServiceClient();
async function getSecret(name: string): Promise<string> {
  const [version] = await client.accessSecretVersion({
    name: client.secretVersionPath(
      process.env.GOOGLE_CLOUD_PROJECT!,
      name,
      "latest"
    ),
  });
  const payload = version.payload?.data?.toString();

  if (!payload) {
    throw new Error(`Could not find secret '${name}'`);
  }
  return payload;
}

export const config = await getConfig();
