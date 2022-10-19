import { List, SimpleListItem } from "@react-md/list";
import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { useEvent } from "../../../../react-query";
import { LocationStateUpcomingEvent } from "../../../../services/location-state";
import { LoadingSpinnerListItem } from "../../../Loading";
import { BackButton } from "./BackButton";

const Component = lazy(() => import("./component"));

interface Props {
  state: LocationStateUpcomingEvent;
}

export function Event(props: Props) {
  return (
    <List>
      <BackButton />
      <EventContent {...props} />
    </List>
  );
}

function EventContent({ state }: Props) {
  const { data: event, isLoading } = useEvent(state.eventId);

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Event</title>
          <meta property="og:title" content="Event - ZwiftMap" />
        </Helmet>
        <LoadingSpinnerListItem />
      </>
    );
  }

  if (!event) {
    return (
      <>
        <Helmet>
          <title>Event</title>
          <meta property="og:title" content="Event - ZwiftMap" />
        </Helmet>
        <SimpleListItem secondaryText="Error loading event">
          An error occurred
        </SimpleListItem>
      </>
    );
  }

  return (
    <Suspense fallback={<LoadingSpinnerListItem />}>
      <Component event={event} state={state} />
    </Suspense>
  );
}
