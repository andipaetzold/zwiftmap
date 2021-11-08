import { List } from "@react-md/list";
import { useLocationState } from "../../../hooks/useLocationState";
import { Details } from "../Details";
import styles from "./index.module.scss";
import { RouteList } from "./RouteList";
import { SearchResultList } from "./SearchResultList";
import { StravaActivitiesList } from "./StravaActivitiesList";

interface Props {
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
  onHoverRoute: (previewRoute: string | undefined) => void;
}

export function Content({ onMouseHoverDistanceChange, onHoverRoute }: Props) {
  const [locationState, setLocationState] = useLocationState();

  return (
    <div className={styles.Content}>
      {locationState.type === "route" ||
      locationState.type === "strava-activity" ? (
        <Details
          onMouseHoverDistanceChange={onMouseHoverDistanceChange}
          backButtonText={
            locationState.query === "" ? "Route List" : "Search Results"
          }
          onBackButtonClick={() => {
            setLocationState({
              world: locationState.world,
              query: locationState.query,
              type: "default",
            });
          }}
        />
      ) : locationState.type === "strava-activities" ? (
        <StravaActivitiesList />
      ) : (
        <List>
          {locationState.query === "" ? (
            <RouteList onHoverRoute={onHoverRoute} />
          ) : (
            <SearchResultList onHoverRoute={onHoverRoute} />
          )}
        </List>
      )}
    </div>
  );
}
