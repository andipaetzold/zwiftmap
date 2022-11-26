import { SummaryAthlete } from "./SummaryAthlete.js";

export interface AuthorizeCodeRequest {
  client_id: string;
  client_secret: string;
  grant_type: "authorization_code";
  code: string;
}

export interface AuthorizeCodeResponse {
  expires_at: number;
  expires_in: number;
  access_token: string;
  refresh_token: string;
  athlete: SummaryAthlete;
}
