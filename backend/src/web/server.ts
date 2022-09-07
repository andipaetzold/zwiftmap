import compression from "compression";
import cors from "cors";
import express from "express";
import session from "express-session";
import { config } from "../shared/config.js";
import { firestore } from "../shared/persistence/firestore.js";
import { FirestoreStore } from "./middleware/connect-firestore.js";
import { logger } from "./middleware/logger.js";
import { requestId } from "./middleware/requestId.js";
import { requestLogger } from "./middleware/requestLogger.js";

export const app = express();
app.use(compression());
app.use(requestId);
app.use(requestLogger);
app.use(logger);

const corsOptions: cors.CorsOptions = {
  origin: [config.frontendUrl],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new FirestoreStore({
      firestore,
      collection: "express-sessions",
    }),
    secret: config.auth.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: config.environment === "production",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1_000,
      sameSite: true,
    },
    name: config.auth.cookieName,
    unset: "destroy",
  })
);

if (config.environment === "production") {
  app.set("trust proxy", 1);
}
