import { TextIconSpacing } from "@react-md/icon";
import { List, SimpleListItem } from "@react-md/list";
import { ListSVGIcon } from "@react-md/material-icons";
import { useAsync } from "react-async-hook";
import { Helmet } from "react-helmet-async";
import { LocationState } from "../../../../services/location-state";
import { getShare } from "../../../../services/zwiftMapApi";
import { Share as ShareType } from "../../../../types";
import { ButtonState } from "../../../ButtonState";
import { LoadingSpinnerListItem } from "../../../Loading";
import { SharedStravaActivity } from "./StravaActivity";

interface Props {
  shareId: string;
  backButtonState: LocationState;
  backButtonText: string;
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
}

export function Share(props: Props) {
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

function ShareContent({ shareId, onMouseHoverDistanceChange }: Props) {
  const { result: share, loading } = useAsync<ShareType>(getShare, [shareId]);

  if (!share) {
    if (loading) {
      return (
        <>
          <Helmet>
            <title>Shared Activity</title>
            <meta property="og:title" content="Shared Activity - ZwiftMap" />
          </Helmet>
          <LoadingSpinnerListItem />
        </>
      );
    } else {
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
  }

  switch (share.type) {
    case "strava-activity": {
      return (
        <SharedStravaActivity
          share={share}
          onMouseHoverDistanceChange={onMouseHoverDistanceChange}
        />
      );
    }
  }
}
