export type Entry = { cursorData: CursorData } & (
  | { entity: "Post" | "Challenge" }
  | ActivityEntry
  | GroupActivityEntry
);

export interface ActivityEntry {
  entity: "Activity";
  activity: {
    id: string;
    activityName: string;
    description: null | string;
  };
}

export interface GroupActivityEntry {
  entity: "GroupActivity";
  rowData: {
    activities: {
      activity_id: number;
      name: string;
      description: null | string;
    }[];
  };
}

export interface CursorData {
  updated_at: number;
  rank: string | null;
}

export interface FeedProps {
  clubId: string;
  currentAthleteId: number;
  feedType: string;
  preFetchedEntries: ReadonlyArray<Entry>;
  page: string;
}
