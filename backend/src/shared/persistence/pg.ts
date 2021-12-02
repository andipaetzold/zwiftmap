import { Pool } from "pg";
import { DATABASE_URL, ENVIRONMENT } from "../config";

export const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl:
    ENVIRONMENT === "production"
      ? {
          rejectUnauthorized: false,
        }
      : undefined,
});
