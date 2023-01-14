import { Request, Response } from "express";
import { Record, String } from "runtypes";
import { createShareImage } from "../../../shared/image/share.js";
import { readShare } from "../../../shared/persistence/index.js";
import { NumberString } from "../../../shared/runtypes.js";

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

  const stream = await createShareImage(share, {
    width: +req.query.width,
    height: +req.query.height,
  });

  res.contentType("png").header("Cache-Control", "public, max-age=604800");
  stream.pipe(res);
}
