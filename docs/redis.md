| Name                               | Description                                                                     | Created                                 | Deleted                          |
| ---------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------- | -------------------------------- |
| `bull:strava-webhook-event:$jobId` | Job data about a `WebhookEvent` sent from Strava.                               | For each incoming Strava `WebhookEvent` | When job is processed.           |
| `bull:share:$jobId`                | Job data about a new `Share`.                                                   | For each new `Share`                    | When job is processed.           |
| `events`                           | List of next 200 upcoming events.                                               | When event list is requested            | 5 mins                           |
| `events:$eventId`                  | Information about an event.                                                     | When specific event ist requested       | 1 hour                           |
| `session:$sessionId`               | Session data. Created by `express-session`.                                     | When authenticating                     | When expired or user signs out   |
| `share:$shareId`                   | Information about a shared activity.                                            | When sharing an activity                | Never                            |
| `share:strava-activities`          | Hashmap. Lookup from Strava activity id to `$shareId`. Used to avoid duplicates | Updated with every share                | Never                            |
| `stravaToken:$athleteId`           | Strava of Strava user `$ahleteId`                                               | When user authenticates with Strava     | When user deauths the Strava app |
