import { Request, Response } from "express";
import { Array, Number, Record, Boolean, String } from "runtypes";
import { savePlaceImage } from "../../../../shared/services/gcs.js";
import { worlds, WorldSlug } from "zwift-data";
import {
  createPlace,
  writePlace,
} from "../../../../shared/persistence/place.js";
import { LatLng } from "../../../../shared/types.js";
import { Session } from "../../../../web/types.js";
import {
  isStravaAdminUser,
  isStravaModeratorUser,
} from "../../../../shared/services/strava/index.js";

const slugs = worlds.map((w) => w.slug as string);
const paramsRunType = Record({
  worldSlug: String.withConstraint<WorldSlug>((worldSlug) =>
    slugs.includes(worldSlug)
  ),
});

const Body = Record({
  name: String.withConstraint((s) => s.length <= 50),
  description: String.withConstraint((s) => s.length <= 500),
  links: Array(String),
  position: Array(Number).withConstraint<LatLng>((a) => a.length === 2),
  imageObjectId: String,
  verified: Boolean,
});

export async function handlePOSTPlace(req: Request, res: Response) {
  if (!paramsRunType.guard(req.params)) {
    res.sendStatus(400);
    return;
  }

  if (!Body.guard(req.body)) {
    res.sendStatus(400);
    return;
  }

  const session = req.session as Session | undefined;
  const canVerify =
    session?.stravaAthleteId &&
    (isStravaAdminUser(session.stravaAthleteId) ||
      isStravaModeratorUser(session.stravaAthleteId));
  if (req.body.verified === true && !canVerify) {
    res.sendStatus(403);
    return;
  }

  let place = await createPlace({
    world: req.params.worldSlug,
    name: req.body.name,
    description: req.body.description,
    position: req.body.position,
    links: req.body.links,
    verified: false,
  });

  const imageUrl = await savePlaceImage(req.body.imageObjectId, place.id);
  place = await writePlace({
    ...place,
    image: imageUrl,
  });

  res.status(200).json(place);
}
