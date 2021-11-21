export interface ZwiftEvent {
  id: number;
  worldId: number;
  name: string;
  description: string;
  shortName: null | string;
  shortDescription: null | string;
  imageUrl: string;
  rulesId: number;
  mapId: number | null;
  routeId: number;
  routeUrl: null | string;
  jerseyHash: number | null;
  bikeHash: number | null;
  visible: boolean;
  overrideMapPreferences: boolean;
  eventStart: string | null;
  durationInSeconds: number;
  distanceInMeters: number;
  laps: number;
  privateEvent: boolean;
  invisibleToNonParticipants: boolean;
  followeeEntrantCount: number;
  totalEntrantCount: number;
  followeeSignedUpCount: number;
  totalSignedUpCount: number;
  followeeJoinedCount: number;
  totalJoinedCount: number;
  eventSubgroups: EventSubgroup[];
  eventSeries: EventSeries | null;
  auxiliaryUrl: null | string;
  imageS3Name: null;
  imageS3Bucket: null;
  sport: Sport;
  cullingType: CullingType;
  rulesSet: RulesSet[];
  recurring: boolean;
  recurringOffset: number | null;
  publishRecurring: boolean;
  parentId: number | null;
  type: Type;
  workoutHash: null;
  customUrl: null | string;
  restricted: boolean;
  unlisted: boolean;
  eventSecret: null | string;
  accessExpression: null;
  tags: string[];
  qualificationRuleIds: null;
  lateJoinInMinutes: number | null;
  timeTrialOptions: TimeTrialOptions | null;
  microserviceName: string | null;
  microserviceExternalResourceId: null | string;
  microserviceEventVisibility: string | null;
  minGameVersion: null;
  recordable: boolean;
  imported: boolean;
  eventTemplateId: null;
  eventType: ZwiftEventType;
}

export enum CullingType {
  CullingEventOnly = "CULLING_EVENT_ONLY",
  CullingEverybody = "CULLING_EVERYBODY",
  CullingSubgroupOnly = "CULLING_SUBGROUP_ONLY",
}

export interface EventSeries {
  id: number;
  name: string;
  description: string | null;
  imported: boolean;
}

export interface EventSubgroup {
  id: number;
  name: string;
  description: string;
  label: number;
  subgroupLabel: SubgroupLabel;
  rulesId: number;
  mapId: number;
  routeId: number;
  routeUrl: null | string;
  jerseyHash: number | null;
  bikeHash: number | null;
  startLocation: number;
  invitedLeaders: number[];
  invitedSweepers: number[];
  paceType: number;
  fromPaceValue: number;
  toPaceValue: number;
  fieldLimit: null;
  registrationStart: string;
  registrationEnd: string;
  lineUpStart: string;
  lineUpEnd: string;
  eventSubgroupStart: string;
  durationInSeconds: number;
  laps: number;
  distanceInMeters: number;
  signedUp: boolean;
  signupStatus: number;
  registered: boolean;
  registrationStatus: number;
  followeeEntrantCount: number;
  totalEntrantCount: number;
  followeeSignedUpCount: number;
  totalSignedUpCount: number;
  followeeJoinedCount: number;
  totalJoinedCount: number;
  auxiliaryUrl: null | string;
  rulesSet: RulesSet[];
  workoutHash: null;
  customUrl: null | string;
  overrideMapPreferences: boolean;
  tags: string[];
  lateJoinInMinutes: number | null;
  timeTrialOptions: TimeTrialOptions | null;
  qualificationRuleIds: null;
  accessValidationResult: null;
}

export type RulesSet =
  | "ALLOWS_LATE_JOIN"
  | "DISABLE_CONTROLLED_ROLLOUT"
  | "LADIES_ONLY"
  | "MEN_ONLY"
  | "NO_DRAFTING"
  | "NO_POWERUPS"
  | "NO_TT_BIKES"
  | "SHOW_RACE_RESULTS";

export type SubgroupLabel = "A" | "B" | "C" | "D" | "E";

export interface TimeTrialOptions {
  timeGapBetweenRowsMs: number;
  maxRows: number;
  maxRidersPerRow: number;
}

export type ZwiftEventType =
  | "GROUP_RIDE"
  | "GROUP_WORKOUT"
  | "RACE"
  | "TIME_TRIAL";

export type Sport = "CYCLING" | "RUNNING";

export type Type =
  | "EVENT_TYPE_GROUP_RIDE"
  | "EVENT_TYPE_GROUP_WORKOUT"
  | "EVENT_TYPE_RACE"
  | "EVENT_TYPE_TIME_TRIAL";
