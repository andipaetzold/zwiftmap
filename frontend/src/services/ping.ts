import { BACKEND_HOST } from "../config";

export async function ping() {
  try {
    await fetch(`${BACKEND_HOST}/ping`);
  } catch {}
}
