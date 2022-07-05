import { Request, Response } from "express";
import { readShare } from "../../../shared/persistence/share";

export async function handleGetShare(req: Request, res: Response) {
  const shareId = req.params.shareId;
  const share = await readShare(shareId);

  if (!share) {
    res.sendStatus(404);
    return;
  }

  res.status(200).header("public, max-age=604800").json(share);
}
