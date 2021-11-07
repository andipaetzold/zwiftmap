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
