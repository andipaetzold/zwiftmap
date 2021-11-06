import { zwiftMapApi } from "./zwiftMapApi";

export async function ping() {
  try {
    await zwiftMapApi.get("/ping");
  } catch {}
}
