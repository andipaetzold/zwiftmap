import { ZwiftEventType } from "./types";

export const EVENT_TYPES: { [type in ZwiftEventType]: string } = {
  GROUP_RIDE: "Group Ride",
  GROUP_WORKOUT: "Workout",
  RACE: "Race",
  TIME_TRIAL: "Time Trial",
};
