import { Request, Response } from "express";
import { Record } from "runtypes";
import { createImage } from "../../../shared/image";
import { readShare } from "../../../shared/persistence/share";
import { NumberString } from "../../services/runtypes";

const Query = Record({
  width: NumberString,
  height: NumberString,
});

export async function handleGETShareImage(req: Request, res: Response) {
  if (!Query.guard(req.query)) {
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
  res.header("Content-Type", "image/png");
  stream.pipe(res);
}
