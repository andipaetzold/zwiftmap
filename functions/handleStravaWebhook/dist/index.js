import { http } from "@google-cloud/functions-framework";
http("createImage", (req, res) => {
    res.sendStatus(200);
});
