import { Request, Response } from "express";
import { readShare } from "../../../shared/persistence/share";

export async function handleGetShare(req: Request, res: Response) {
  const shareId = req.params.shareId;
  const share = await readShare(shareId);
  res.json(share);
}
