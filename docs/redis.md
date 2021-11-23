| Name                               | Description                                                                     | Created                                 | Deleted                          |
| ---------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------- | -------------------------------- |
| `stravaToken:$athleteId`           | Strava of Strava user `$ahleteId`                                               | When user authenticates with Strava     | When user deauths the Strava app |
| `session:$sessionId`               | Session data. Created by `express-session`.                                     | When authenticating                     | When expired or user signs out   |
| `bull:strava-webhook-event:$jobId` | Job data about a `WebhookEvent` sent from Strava.                               | For each incoming Strava `WebhookEvent` | When job is processed.           |
| `bull:share:$jobId`                | Job data about a new `Share`.                                                   | For each new `Share`                    | When job is processed.           |
| `share:$shareId`                   | Information about a shared activity.                                            | When sharing an activity                | Never                            |
| `share:strava-activities`          | Hashmap. Lookup from Strava activity id to `$shareId`. Used to avoid duplicates | Updated with every share                | Never                            |
