import axios from "axios";
import { Request, Response } from "express";
import { fetchEvent } from "../../../shared/events/api";

export async function handleGetEventWorkout(req: Request, res: Response) {
  const eventId = req.params.eventId;

  const event = await fetchEvent(eventId);

  if (!event) {
    res.sendStatus(404);
    return;
  }

  if (event.type !== "EVENT_TYPE_GROUP_WORKOUT") {
    res.sendStatus(404);
    return;
  }

  const workoutUrl =
    event.customUrl !== ""
      ? event.customUrl
      : event.eventSubgroups[0].customUrl;

  if (!workoutUrl) {
    res.sendStatus(404);
    return;
  }

  try {
    const response = await axios.get(workoutUrl);
    res.status(200).contentType("xml").send(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      res.sendStatus(error.response.status);
    } else {
      res.sendStatus(500);
    }
  }
}
