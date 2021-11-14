import mitt from "mitt";
import { AuthStatus } from "../types";

export const AUTH_STATUS_UPDATE = Symbol("AUTH_STATUS_UPDATE");

type Events = {
  [AUTH_STATUS_UPDATE]: AuthStatus;
};

export const emitter = mitt<Events>();
