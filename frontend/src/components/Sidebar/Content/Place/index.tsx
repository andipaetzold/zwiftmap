import { SimpleListItem } from "@react-md/list";
import { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { useWorldPlace } from "../../../../react-query";
import { LocationStatePlace } from "../../../../services/location-state";
import { LoadingSpinnerListItem } from "../../../Loading";
import { BackButton } from "./BackButton";
import PlaceComponent from "./component";

interface Props {
  state: LocationStatePlace;
}

export function Place(props: Props) {
  return (
    <>
      <BackButton />
      <PlaceContent {...props} />
    </>
  );
}

function PlaceContent({ state }: Props) {
  const { data: place, isLoading } = useWorldPlace(
    state.world.slug,
    state.placeId,
  );

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Place</title>
          <meta property="og:title" content="Place - ZwiftMap" />
        </Helmet>
        <LoadingSpinnerListItem />
      </>
    );
  }

  if (!place) {
    return (
      <>
        <Helmet>
          <title>Place</title>
          <meta property="og:title" content="Place - ZwiftMap" />
        </Helmet>
        <SimpleListItem secondaryText="Error loading place">
          An error occurred
        </SimpleListItem>
      </>
    );
  }

  return (
    <Suspense fallback={<LoadingSpinnerListItem />}>
      <PlaceComponent place={place} state={state} />
    </Suspense>
  );
}
