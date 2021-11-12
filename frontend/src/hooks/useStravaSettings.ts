import { useAsync } from "react-async-hook";
import {
  getStravaSettings,
  updateStravaSettings,
} from "../services/zwiftMapApi";
import { StravaSettings } from "../types";
import { useIsLoggedInStrava } from "./useIsLoggedInStrava";

export function useStravaSettings(): [
  StravaSettings | null,
  (settings: StravaSettings) => void
] {
  const isLoggedInStrava = useIsLoggedInStrava();
  const { result, set } = useAsync(
    async (loggedIn: boolean | null) => {
      if (loggedIn !== true) {
        return null;
      }

      return await getStravaSettings();
    },
    [isLoggedInStrava]
  );

  const handleUpdate = async (settings: StravaSettings) => {
    set({
      status: "success",
      result: settings,
      loading: false,
      error: undefined,
    });
    await updateStravaSettings(settings);
  };

  return [result ?? null, handleUpdate];
}
