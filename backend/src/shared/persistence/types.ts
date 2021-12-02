import { Boolean, Record, Static } from "runtypes";

export const StravaSettings = Record({
  addLinkToActivityDescription: Boolean,
});

export type StravaSettingsType = Static<typeof StravaSettings>;
export type StravaSettingsDBRow = { athleteId: number } & StravaSettingsType;

export interface StravaToken {
  athleteId: number;
  token: string;
  refreshToken: string;
  expiresAt: number;
  scope?: string[] | null;
}
