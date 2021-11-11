import { Request, Response } from "express";
import { readSharedItem } from "../../../shared/persistence/sharedItem";

export async function handleGetSharedItem(req: Request, res: Response) {
  const sharedItemId = req.params.sharedItemId;
  const sharedItem = await readSharedItem(sharedItemId);
  res.json(sharedItem);
}
