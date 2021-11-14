import { AuthStatus } from "../types";
import { AUTH_STATUS_UPDATE, emitter } from "./emitter";
import { zwiftMapApi } from "./zwiftMapApi";

export async function logout(): Promise<void> {
  const authStatus = getCachedAuthStatus();
  if (!authStatus) {
    return;
  }

  writeAuthStatus({
    strava: false,
  });
  await zwiftMapApi.post("/auth/logout");
}

export const AuthStatusLoading = Symbol("Auth Status Loading");

let authStatus: AuthStatus | typeof AuthStatusLoading = AuthStatusLoading;

export function getCachedAuthStatus(): AuthStatus | typeof AuthStatusLoading {
  return authStatus;
}

export function writeAuthStatus(newAuthStatus: AuthStatus): void {
  authStatus = newAuthStatus;
  emitter.emit(AUTH_STATUS_UPDATE, authStatus);
}

export async function fetchAuthStatus(): Promise<AuthStatus> {
  try {
    const response = await zwiftMapApi.get<AuthStatus>("/auth/status");

    writeAuthStatus(response.data);

    return response.data;
  } catch (e) {
    writeAuthStatus({
      strava: false,
    });
    throw e;
  }
}
