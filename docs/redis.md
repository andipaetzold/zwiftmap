| Name                               | Description                                       | Created                                 | Deleted                          |
| ---------------------------------- | ------------------------------------------------- | --------------------------------------- | -------------------------------- |
| `bull:share:$jobId`                | Job data about a new `Share`.                     | For each new `Share`                    | When job is processed.           |
| `bull:strava-webhook-event:$jobId` | Job data about a `WebhookEvent` sent from Strava. | For each incoming Strava `WebhookEvent` | When job is processed.           |
| `events`                           | List of next 200 upcoming events.                 | When event list is requested            | 5 mins                           |
| `events:$eventId`                  | Information about an event.                       | When specific event ist requested       | 1 hour                           |
| `session:$sessionId`               | Session data. Created by `express-session`.       | When authenticating                     | When expired or user signs out   |
| `stravaToken:$athleteId`           | Strava of Strava user `$ahleteId`                 | When user authenticates with Strava     | When user deauths the Strava app |
