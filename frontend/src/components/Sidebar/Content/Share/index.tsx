import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { List, SimpleListItem } from "@react-md/list";
import { ListFontIcon } from "@react-md/material-icons";
import { useAsync } from "react-async-hook";
import { Helmet } from "react-helmet-async";
import { getShare } from "../../../../services/zwiftMapApi";
import { Share as ShareType } from "../../../../types";
import { LoadingSpinnerListItem } from "../../../Loading";
import { SharedStravaActivity } from "./StravaActivity";

interface Props {
  shareId: string;
  backButtonText: string;
  onBackButtonClick: () => void;
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
}

export function Share(props: Props) {
  const { onBackButtonClick, backButtonText } = props;

  return (
    <List>
      <SimpleListItem>
        <Button themeType="outline" onClick={onBackButtonClick}>
          <TextIconSpacing icon={<ListFontIcon />}>
            {backButtonText}
          </TextIconSpacing>
        </Button>
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
          </Helmet>
          <LoadingSpinnerListItem />
        </>
      );
    } else {
      return (
        <>
          <Helmet>
            <title>Shared Activity</title>
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
