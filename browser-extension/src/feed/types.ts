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
  before: string;
  rank: string;
}

export interface FeedProps {
  clubId: string;
  currentAthleteId: number;
  feedType: string;
  preFetchedEntries: Entry[];
  page: string;
}
