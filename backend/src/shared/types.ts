import {
  Dictionary,
  Literal,
  Number,
  Record,
  Static,
  StringDictionary,
  Union,
  Unknown,
} from "runtypes";

export const WebhookEvent = Record({
  aspect_type: Union(Literal("create"), Literal("update"), Literal("delete")),
  event_time: Number,
  object_id: Number,
  object_type: Union(Literal("activity"), Literal("athlete")),
  owner_id: Number,
  subscription_id: Number,
  updates: Dictionary(Unknown) as StringDictionary<typeof Unknown>,
});
export type WebhookEventType = Static<typeof WebhookEvent>;

export type LogFn = (...data: any) => void;

export interface Logger {
  debug: LogFn;
  info: LogFn;
  log: LogFn;
  error: LogFn;
  trace: LogFn;
  warn: LogFn;
}

export interface ImageQueueData {
  type: "share";
  shareId: string;

  resolution: { width: number; height: number };
  googleCloudStorage?: {
    filename: string;
  };
}

export type LatLng = [lat: number, lng: number];
