import morgan from "morgan";

morgan.token("id", (req) => req.id);

export const requestLogger = morgan(
  "[:id] :method :url :status :res[content-length] - :response-time ms"
);
