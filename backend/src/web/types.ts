import session from "express-session";

export type Session = session.Session &
  Partial<session.SessionData> & {
    stravaAthleteId?: number;
  };
