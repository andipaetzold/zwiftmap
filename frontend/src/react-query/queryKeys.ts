export const queries = {
  authStatus: ["auth"],
  events: ["events"],
  event: (eventId: number | undefined) => ["events", eventId],
};
