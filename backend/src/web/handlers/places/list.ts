import { Request, Response } from "express";
import { readPlaces } from "../../../shared/persistence/index.js";

export async function handleGETPlaces(_req: Request, res: Response) {
  const places = await readPlaces();

  res.status(200).header("Cache-Control", "public, max-age=86400").json(places);
}
