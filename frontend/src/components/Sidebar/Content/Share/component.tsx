import { TextIconSpacing } from "@react-md/icon";
import { List, SimpleListItem } from "@react-md/list";
import { ListSVGIcon } from "@react-md/material-icons";
import { Helmet } from "react-helmet-async";
import { useShare } from "../../../../react-query";
import { LocationState } from "../../../../services/location-state";
import { ButtonState } from "../../../ButtonState";
import { LoadingSpinnerListItem } from "../../../Loading";
import { SharedStravaActivity } from "./StravaActivity";

interface Props {
  shareId: string;
  backButtonState: LocationState;
  backButtonText: string;
}

export default function Share(props: Props) {
  const { backButtonState, backButtonText } = props;

  return (
    <List>
      <SimpleListItem>
        <ButtonState themeType="outline" state={backButtonState}>
          <TextIconSpacing icon={<ListSVGIcon />}>
            {backButtonText}
          </TextIconSpacing>
        </ButtonState>
      </SimpleListItem>

      <ShareContent {...props} />
    </List>
  );
}

function ShareContent({ shareId }: Props) {
  const { data: share, isLoading, isError } = useShare(shareId);

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Shared Activity</title>
          <meta property="og:title" content="Shared Activity - ZwiftMap" />
        </Helmet>
        <LoadingSpinnerListItem />
      </>
    );
  }

  if (isError || !share) {
    return (
      <>
        <Helmet>
          <title>Shared Activity</title>
          <meta property="og:title" content="Shared Activity - ZwiftMap" />
        </Helmet>
        <SimpleListItem>An error occurred</SimpleListItem>
      </>
    );
  }

  switch (share.type) {
    case "strava-activity": {
      return <SharedStravaActivity share={share} />;
    }
  }
}
