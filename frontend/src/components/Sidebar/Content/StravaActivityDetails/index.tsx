import { List, SimpleListItem } from "@react-md/list";
import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { useIsLoggedInStrava } from "../../../../hooks/useIsLoggedInStrava";
import { useStravaActivity } from "../../../../react-query";
import { LocationStateStravaActivity } from "../../../../services/location-state";
import { ErrorWithStatus } from "../../../../services/request";
import { ConnectToStravaListItem } from "../../../ConnectToStravaListItem";
import { LoadingSpinnerListItem } from "../../../Loading";
import { BackButton } from "./BackButton";

const Component = lazy(() => import("./component"));

interface Props {
  state: LocationStateStravaActivity;
}

export function StravaActivityDetails(props: Props) {
  return (
    <List>
      <BackButton state={props.state} />
      <StravaActivityDetailsContent {...props} />
    </List>
  );
}

function StravaActivityDetailsContent({ state }: Props) {
  const isLoggedInStrava = useIsLoggedInStrava();
  const {
    data: activity,
    isLoading,
    error,
  } = useStravaActivity(state.stravaActivityId);

  const genericHelmet = (
    <Helmet>
      <title>Strava Activity</title>
      <meta property="og:title" content={`Strava Activity - ZwiftMap`} />
    </Helmet>
  );

  if (isLoggedInStrava === null) {
    return (
      <>
        {genericHelmet}
        <LoadingSpinnerListItem />
      </>
    );
  }

  if (!isLoggedInStrava) {
    return (
      <>
        {genericHelmet}
        <ConnectToStravaListItem />
      </>
    );
  }

  if (error) {
    if (error instanceof ErrorWithStatus) {
      switch (error.status) {
        case 403:
          return (
            <>
              {genericHelmet}
              <SimpleListItem threeLines>
                You do not have permission to access this activity. You can only
                access your own activities.
              </SimpleListItem>
            </>
          );

        case 404:
          return (
            <>
              {genericHelmet}
              <SimpleListItem threeLines>
                Could not find the requested Strava activity.
              </SimpleListItem>
            </>
          );

        case 429:
          return (
            <>
              {genericHelmet}
              <SimpleListItem threeLines>
                ZwiftMap received too many requests and got rate limited by
                Strava.
                <br />
                Please try again in a few minutes.
              </SimpleListItem>
            </>
          );
      }
    }

    return (
      <>
        {genericHelmet}
        <SimpleListItem threeLines>An error occurred.</SimpleListItem>
      </>
    );
  }

  if (isLoading || activity === undefined) {
    return (
      <>
        {genericHelmet}
        <LoadingSpinnerListItem />
      </>
    );
  }

  return (
    <Suspense fallback={<LoadingSpinnerListItem />}>
      <Component activity={activity} />
    </Suspense>
  );
}
