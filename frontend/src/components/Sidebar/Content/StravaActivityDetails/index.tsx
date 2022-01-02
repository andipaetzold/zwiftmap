import { List, SimpleListItem } from "@react-md/list";
import * as Sentry from "@sentry/react";
import React from "react";
import { useAsync } from "react-async-hook";
import { Helmet } from "react-helmet-async";
import { useIsLoggedInStrava } from "../../../../hooks/useIsLoggedInStrava";
import { LocationStateStravaActivity } from "../../../../services/location-state";
import { ErrorWithStatus } from "../../../../services/request";
import { getStravaActivity } from "../../../../services/StravaActivityRepository";
import { ConnectToStravaListItem } from "../../../ConnectToStravaListItem";
import { LoadingSpinnerListItem } from "../../../Loading";
import { BackButton } from "./BackButton";
import { StravaActivityDetailsComponent } from "./component";

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
    result: activity,
    loading,
    error,
  } = useAsync(getStravaActivity, [state.stravaActivityId], {
    onError: (e) => Sentry.captureException(e),
  });

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

  if (loading || activity === undefined) {
    return (
      <>
        {genericHelmet}
        <LoadingSpinnerListItem />
      </>
    );
  }

  return <StravaActivityDetailsComponent activity={activity} />;
}
