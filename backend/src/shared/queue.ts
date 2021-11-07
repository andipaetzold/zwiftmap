import Queue from "bull";
import { REDIS_URL } from "./config";

export const activityCreateQueue = new Queue("activity-create", REDIS_URL);
