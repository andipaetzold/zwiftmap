import { writeStravaToken } from "./strava/token";

function updateStravaToken() {
  const params = new URLSearchParams(window.location.search);

  if (params.has("strava-auth")) {
    writeStravaToken(JSON.parse(params.get("strava-auth")!));

    params.delete("strava-auth");
    const paramsString = params.toString();

    let url = `${window.location.origin}${window.location.pathname}`;
    if (paramsString !== "") {
      url += `?${paramsString}`;
    }

    window.history.replaceState(undefined, "", url);
  }
}

export function listenForStravaToken() {
  updateStravaToken();
  window.addEventListener("popstate", updateStravaToken);
}
