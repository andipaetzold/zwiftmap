import { List, SimpleListItem } from "@react-md/list";
import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { useEvent } from "../../../../react-query/useEvent";
import { LoadingSpinnerListItem } from "../../../Loading";
import { BackButton } from "./BackButton";

const Component = lazy(() => import("./component"));

interface Props {
  eventId: number;
}

export function Event(props: Props) {
  return (
    <List>
      <BackButton />
      <EventContent {...props} />
    </List>
  );
}

function EventContent({ eventId }: Props) {
  const { data: event, isLoading } = useEvent(eventId);

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
      <Component event={event} />
    </Suspense>
  );
}
