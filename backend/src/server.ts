import compression from "compression";
import express from "express";
import morgan from "morgan";
import nocache from "nocache";

export const app = express();
app.use(nocache());
app.use(compression());
app.use(morgan("tiny"));
