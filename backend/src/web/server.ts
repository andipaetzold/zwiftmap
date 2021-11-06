import compression from "compression";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import nocache from "nocache";
import { AUTH_SECRET, BACKEND_URL, FRONTEND_URL } from "../shared/config";
import { redisClient } from "../shared/persistence/redis";

export const app = express();
app.use(nocache());
app.use(compression());
app.use(morgan("tiny"));

const corsOptions: cors.CorsOptions = {
  origin: FRONTEND_URL,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const RedisStore = connectRedis(session);

app.use(
  session({
    store: new RedisStore({
      client: redisClient,
      prefix: "session:",
    }),
    secret: AUTH_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: BACKEND_URL.startsWith("https://"),
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1_000,
    },
  })
);
