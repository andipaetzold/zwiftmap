import "dotenv/config";

export const PORT = Number.parseInt(process.env.PORT!);

export const FRONTEND_URL = process.env.FRONTEND_URL!;
export const BACKEND_URL = process.env.BACKEND_URL!;

export const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID!;
export const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET!;
