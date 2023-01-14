import { Request, Response } from "express";
import { Record, String } from "runtypes";
import { readShare } from "../../../shared/persistence/index.js";

const paramsRunType = Record({
  shareId: String,
});

export async function handleGetShare(req: Request, res: Response) {
  if (!paramsRunType.guard(req.params)) {
    res.sendStatus(400);
    return;
  }

  const shareId = req.params.shareId;
  const share = await readShare(shareId);

  if (!share) {
    res.sendStatus(404);
    return;
  }

  res.status(200).header("Cache-Control", "public, max-age=604800").json(share);
}
