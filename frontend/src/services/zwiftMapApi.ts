import axios from "axios";
import { BACKEND_HOST } from "../config";
import { Share, StravaSettings } from "../types";

export const zwiftMapApi = axios.create({
  baseURL: BACKEND_HOST,
  withCredentials: true,
});

export async function getShare(id: string) {
  const response = await zwiftMapApi.get<Share>(`/share/${id}`);
  return response.data;
}

export async function getStravaSettings() {
  const response = await zwiftMapApi.get<StravaSettings>(`/strava/settings`);
  return response.data;
}

export async function updateStravaSettings(settings: StravaSettings) {
  await zwiftMapApi.put<StravaSettings>(`/strava/settings`, settings);
}
