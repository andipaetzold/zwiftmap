import { Request, Response } from "express";
import { Record, String } from "runtypes";
import { createImage } from "../../../shared/image.js";
import { readShare } from "../../../shared/persistence/share.js";
import { NumberString } from "../../services/runtypes.js";

const paramsRunType = Record({
  shareId: String,
});

const queryRunType = Record({
  width: NumberString,
  height: NumberString,
});

export async function handleGETShareImage(req: Request, res: Response) {
  if (!paramsRunType.guard(req.params)) {
    res.sendStatus(400);
    return;
  }

  if (!queryRunType.guard(req.query)) {
    res.sendStatus(400);
    return;
  }

  const shareId = req.params.shareId;
  const share = await readShare(shareId);

  if (!share) {
    res.sendStatus(404);
    return;
  }

  if (share.type !== "strava-activity") {
    res.sendStatus(404);
    return;
  }

  const stream = await createImage(share, {
    width: +req.query.width,
    height: +req.query.height,
  });

  res.contentType("png").header("public, max-age=604800");
  stream.pipe(res);
}
