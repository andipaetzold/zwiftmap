import compression from "compression";
import cors from "cors";
import express from "express";
import session from "express-session";
import {
  AUTH_COOKIE_NAME,
  AUTH_SECRET,
  ENVIRONMENT,
  FRONTEND_URL,
} from "../shared/config";
import { firestore } from "../shared/persistence/firestore";
import { FirestoreStore } from "./middleware/connect-firestore";
import { logger } from "./middleware/logger";
import { requestId } from "./middleware/requestId";
import { requestLogger } from "./middleware/requestLogger";

export const app = express();
app.use(compression());
app.use(requestId);
app.use(requestLogger);
app.use(logger);

const corsOptions: cors.CorsOptions = {
  origin: [FRONTEND_URL],
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
    secret: AUTH_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: ENVIRONMENT === "production",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1_000,
      sameSite: true,
    },
    name: AUTH_COOKIE_NAME,
    unset: "destroy",
  })
);

if (ENVIRONMENT === "production") {
  app.set("trust proxy", 1);
}
