import { RulesSet, ZwiftEventType } from "../../types";

export const EVENT_TYPES: { [type in ZwiftEventType]: string } = {
  GROUP_RIDE: "Group Ride",
  GROUP_WORKOUT: "Group Workout",
  RACE: "Race",
  TIME_TRIAL: "Time Trial",
};

export const EVENT_RULES: { [type in RulesSet]: string } = {
  NO_TT_BIKES: "No TT Bikes",
  SHOW_RACE_RESULTS: "Show Race Results",
  ALLOWS_LATE_JOIN: "Allows Late Join",
  LADIES_ONLY: "Ladies Only",
  MEN_ONLY: "Men Only",
  NO_DRAFTING: "No Drafting",
  NO_POWERUPS: "No Powerups",
  DISABLE_CONTROLLED_ROLLOUT: "Disable Controlled Rollout",
};
