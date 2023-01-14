import { Request, Response } from "express";
import { Literal, Number, Record, Union } from "runtypes";
import { createUploadUrl } from "../../../shared/services/gcs.js";

const Body = Record({
  contentType: Union(Literal("image/png"), Literal("image/jpeg")),
  contentLength: Number.withConstraint((v) => v <= 512 * 1024), // 512kb
});

export async function handlePOSTUpload(req: Request, res: Response) {
  if (!Body.guard(req.body)) {
    res.sendStatus(400);
    return;
  }

  const { uploadUrl, objectId } = await createUploadUrl(req.body);

  return res.json({ uploadUrl, objectId });
}
