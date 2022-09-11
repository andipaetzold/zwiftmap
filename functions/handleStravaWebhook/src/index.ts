import { http } from "@google-cloud/functions-framework";

http("handleStravaWebhook", (req, res) => {
  res.sendStatus(200);
});
