import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { List, SimpleListItem } from "@react-md/list";
import { ListFontIcon } from "@react-md/material-icons";
import { CircularProgress } from "@react-md/progress";
import { useAsync } from "react-async-hook";
import { getShare } from "../../../../services/zwiftMapApi";
import { Share as ShareType } from "../../../../types";
import { SharedStravaActivity } from "./StravaActivity";

interface Props {
  shareId: string;
  backButtonText: string;
  onBackButtonClick: () => void;
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
}

export function Share({
  shareId,
  onBackButtonClick,
  backButtonText,
  onMouseHoverDistanceChange,
}: Props) {
  const { result: share, loading } = useAsync<ShareType>(getShare, [shareId]);

  const backButton = (
    <SimpleListItem>
      <Button themeType="outline" onClick={onBackButtonClick}>
        <TextIconSpacing icon={<ListFontIcon />}>
          {backButtonText}
        </TextIconSpacing>
      </Button>
    </SimpleListItem>
  );

  if (!share) {
    if (loading) {
      return (
        <List>
          {backButton}
          <SimpleListItem>
            <CircularProgress
              id={`share-${shareId}`}
              circleStyle={{ stroke: "black" }}
            />
          </SimpleListItem>
        </List>
      );
    } else {
      return (
        <List>
          {backButton}
          <SimpleListItem>An error occurred</SimpleListItem>
        </List>
      );
    }
  }

  switch (share.type) {
    case "strava-activity": {
      return (
        <List>
          {backButton}
          <SharedStravaActivity
            share={share}
            onMouseHoverDistanceChange={onMouseHoverDistanceChange}
          />
        </List>
      );
    }
  }
}
