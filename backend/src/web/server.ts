import compression from "compression";
import { FRONTEND_URL } from "../shared/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import nocache from "nocache";

export const app = express();
app.use(nocache());
app.use(compression());
app.use(morgan("tiny"));

const corsOptions: cors.CorsOptions = {
  origin: FRONTEND_URL,
};
app.use(cors(corsOptions));
app.use(express.json());
