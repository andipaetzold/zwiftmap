import { useEffect, useState } from "react";
import { BACKEND_HOST } from "../../config";
import { urlSearchParamsToObject } from "../../util";

function getStravaAuthUrl() {
  const params = new URLSearchParams();
  params.set(
    "state",
    JSON.stringify({
      path: window.location.pathname,
      search: urlSearchParamsToObject(
        new URLSearchParams(window.location.search)
      ),
    })
  );

  return `${BACKEND_HOST}/strava/authorize?${params.toString()}`;
}

export function useStravaAuthUrl(): string {
  const [url, setUrl] = useState(getStravaAuthUrl);

  useEffect(() => {
    const listener = () => setUrl(getStravaAuthUrl());
    window.addEventListener("popstate", listener);
    return () => window.removeEventListener("popstate", listener);
  }, []);
  return url;
}
