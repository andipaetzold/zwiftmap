# Backend

## Persisted Entities

| Name                               | Description                                                                       | Created                                 | Deleted                          |
| ---------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------- | -------------------------------- |
| `stravaToken:$athleteId`           | Strava of Strava user `$ahleteId`                                                 | When user authenticates with Strava     | When user deauths the Strava app |
| `session:$sessionId`               | Session data. Created by `express-session`.                                       | When authenticating                     | When expired or user signs out   |
| `bull:strava-webhook-event:$jobId` | Job data about a `WebhookEvent` sent from Strava.                                 | For each incoming Strava `WebhookEvent` | When job is processed.           |
| `sharedItem:$sharedItemId`         | Information about a shared activity.                                              | When sharing an activity                | Never                            |
| `sharedItem:lookup`                | Single item. Lookup from hashed object to $sharedItemId. Used to avoid duplicates | Updated with every share                | Never                            |
