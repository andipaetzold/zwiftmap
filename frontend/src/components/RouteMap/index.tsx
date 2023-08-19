import turfDistance from "@turf/distance";
import { point as turfPoint } from "@turf/helpers";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useStore } from "../../hooks/useStore";
import {
  useEvent,
  useShare,
  useStravaActivity,
  useStravaSegmentStreams,
  useWorkerNavigate,
  useWorldPlace,
} from "../../react-query";
import { getRouteFromEvent, getSubgroupFromEvent } from "../../services/events";
import {
  DEFAULT_WORLD,
  LocationState,
  navigate,
  useLocationState,
} from "../../services/location-state";
import { DistanceStream, LatLngStream } from "../../types";
import { dropAltitude } from "../../util/drop-altitude";
import styles from "./index.module.scss";
import { Map } from "./Map";
import { WorldSelect } from "./WorldSelect";

export default function RouteMap() {
  const state = useLocationState();
  const setQuery = useStore((state) => state.setQuery);

  const routeStreams = useRouteStreams(state);
  const place = usePlace(state);

  const selectedWorld = state.world ?? DEFAULT_WORLD;

  return (
    <div className={styles.Container} aria-hidden="true">
      <WorldSelect
        world={selectedWorld}
        onWorldChange={(newWorld) => {
          setQuery("");
          switch (state.type) {
            case "custom-route":
              navigate({
                world: newWorld,
                type: "custom-route",
                points: [null, null],
              });
              break;
            case "place-new":
            case "fog":
              navigate({
                world: newWorld,
                type: state.type,
              });
              break;
            default:
              navigate({
                world: newWorld,
                type: "default",
              });
              break;
          }
        }}
      />
      <Map
        key={selectedWorld.slug}
        state={state}
        world={selectedWorld}
        routeStreams={routeStreams}
        place={place}
      />
    </div>
  );
}

interface RouteStreams {
  latlng: LatLngStream;
  distance: DistanceStream;
}

function useRouteStreams(state: LocationState): RouteStreams | undefined {
  const routeResults = useStravaSegmentStreams({
    stravaSegmentId:
      state.type === "route" ? state.route.stravaSegmentId : undefined,
    streams: ["distance", "latlng"] as const,
  });
  const segmentResults = useStravaSegmentStreams({
    stravaSegmentId:
      state.type === "segment" ? state.segment.stravaSegmentId : undefined,
    streams: ["distance", "latlng"] as const,
  });
  const stravaActivityResult = useStravaActivity(
    state.type === "strava-activity" ? state.stravaActivityId : undefined,
  );
  const shareResult = useShare(
    state.type === "share" ? state.shareId : undefined,
  );

  const eventResult = useEvent(
    state.type === "event" ? state.eventId : undefined,
  );
  const eventStreamsResult = useStravaSegmentStreams({
    stravaSegmentId:
      state.type === "event" && eventResult.data
        ? getRouteFromEvent(
            getSubgroupFromEvent(eventResult.data, state.subgroupLabel) ??
              eventResult.data,
          )?.stravaSegmentId
        : undefined,
    streams: ["distance", "latlng"] as const,
  });

  const customRouteResult = useWorkerNavigate(
    state.type === "custom-route"
      ? {
          world: state.world.slug,
          points: state.points.filter((p): p is LatLngTuple => p !== null),
        }
      : undefined,
  );

  switch (state.type) {
    case "route": {
      const [distanceResult, latLngResult] = routeResults;
      if (!distanceResult.data || !latLngResult.data) {
        return;
      }
      return {
        distance: distanceResult.data as DistanceStream,
        latlng: latLngResult.data as LatLngStream,
      };
    }

    case "segment": {
      const [distanceResult, latLngResult] = segmentResults;
      if (!distanceResult.data || !latLngResult.data) {
        return;
      }
      return {
        distance: distanceResult.data,
        latlng: latLngResult.data,
      };
    }

    case "strava-activity": {
      if (
        !stravaActivityResult.data?.streams.distance ||
        !stravaActivityResult.data?.streams.latlng
      ) {
        return;
      }

      return {
        distance: stravaActivityResult.data.streams.distance,
        latlng: stravaActivityResult.data.streams.latlng,
      };
    }

    case "event": {
      const [distanceResult, latLngResult] = eventStreamsResult;
      if (!distanceResult.data || !latLngResult.data) {
        return;
      }
      return {
        distance: distanceResult.data,
        latlng: latLngResult.data,
      };
    }

    case "custom-route": {
      if (!customRouteResult.data) {
        return;
      }
      const latlng = customRouteResult.data.map(dropAltitude);
      const distance = latlng
        .map((latlng, index, array) =>
          index === 0
            ? 0
            : turfDistance(turfPoint(array[index - 1]), turfPoint(latlng), {
                units: "meters",
              }),
        )
        .reduce(
          (prev, cur, index) =>
            index === 0 ? [0] : [...prev, prev[prev.length - 1] + cur],
          [] as number[],
        );

      return { distance, latlng };
    }

    case "share": {
      if (!shareResult.data) {
        return;
      }
      return {
        distance: shareResult.data.streams.distance.data,
        latlng: shareResult.data.streams.latlng.data,
      };
    }
  }
}

function usePlace(state: LocationState) {
  const { data } = useWorldPlace(
    state.world?.slug,
    "placeId" in state ? state.placeId : undefined,
  );

  return state.type === "place" ? data : undefined;
}
