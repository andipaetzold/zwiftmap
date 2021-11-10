# Backend

## Persisted Entities

| Name                               | Description                                       | Created                                 | Deleted                          |
| ---------------------------------- | ------------------------------------------------- | --------------------------------------- | -------------------------------- |
| `stravaToken:$athleteId`           | Strava of Strava user `$ahleteId`                 | When user authenticates with Strava     | When user deauths the Strava app |
| `session:$sessionId`               | Session data. Created by `express-session`.       | When authenticating                     | When expired or user signs out   |
| `bull:strava-webhook-event:$jobId` | Job data about a `WebhookEvent` sent from Strava. | For each incoming Strava `WebhookEvent` | When job is processed.           |
| `sharedItem:$sharedItemId`         | Job data about a `WebhookEvent` sent from Strava. | When sharing an activity                | Never                            |
