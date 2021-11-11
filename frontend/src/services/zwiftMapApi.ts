import axios from "axios";
import { BACKEND_HOST } from "../config";
import { SharedItem } from "../types";

export const zwiftMapApi = axios.create({
  baseURL: BACKEND_HOST,
  withCredentials: true,
});

export async function getSharedItem(id: string) {
  const response = await zwiftMapApi.get<SharedItem>(`/shared/${id}`);
  return response.data;
}