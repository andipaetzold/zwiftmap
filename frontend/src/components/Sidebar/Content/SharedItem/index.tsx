import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { List, SimpleListItem } from "@react-md/list";
import { ListFontIcon } from "@react-md/material-icons";
import { CircularProgress } from "@react-md/progress";
import { useAsync } from "react-async-hook";
import { getSharedItem } from "../../../../services/zwiftMapApi";
import { SharedItem as SharedItemType } from "../../../../types";
import { SharedStravaActivity } from "./StravaActivity";

interface Props {
  sharedItemId: string;
  backButtonText: string;
  onBackButtonClick: () => void;
  onMouseHoverDistanceChange: (distance: number | undefined) => void;
}

export function SharedItem({
  sharedItemId,
  onBackButtonClick,
  backButtonText,
  onMouseHoverDistanceChange,
}: Props) {
  const { result: sharedItem, loading } = useAsync<SharedItemType>(
    getSharedItem,
    [sharedItemId]
  );

  const backButton = (
    <SimpleListItem>
      <Button themeType="outline" onClick={onBackButtonClick}>
        <TextIconSpacing icon={<ListFontIcon />}>
          {backButtonText}
        </TextIconSpacing>
      </Button>
    </SimpleListItem>
  );

  if (!sharedItem) {
    if (loading) {
      return (
        <CircularProgress
          id={`shared-item-${sharedItemId}`}
          circleStyle={{ stroke: "black" }}
        />
      );
    } else {
      return (
        <List>
          <SimpleListItem>An error occurred</SimpleListItem>
        </List>
      );
    }
  }

  switch (sharedItem.type) {
    case "strava-activity": {
      return (
        <List>
          {backButton}
          <SharedStravaActivity
            sharedItem={sharedItem}
            onMouseHoverDistanceChange={onMouseHoverDistanceChange}
          />
        </List>
      );
    }
  }
}
