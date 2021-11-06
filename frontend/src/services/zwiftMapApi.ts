import axios from "axios";
import { BACKEND_HOST } from "../config";

export const zwiftMapApi = axios.create({
  baseURL: BACKEND_HOST,
  withCredentials: true,
});
