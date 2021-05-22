import { FRONTEND_URL, PORT } from "./config";
import { app } from "./server";
import "./strava";

app.get("*", (req, res) => res.redirect(FRONTEND_URL));

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
