import { STRAVA_VERIFY_TOKEN, STRAVA_WEBHOOK_HOST } from "../../shared/config";
import { stravaAppAPI } from "./strava";

export async function setupWebhook() {
  const subscriptionId = await getWebhookSubscriptionId();
  if (subscriptionId) {
    await deleteWebhookSubscription(subscriptionId);
  }
  await createWebhookSubscription();
}

async function createWebhookSubscription() {
  console.log("Creating Webhook Subscription");

  try {
    const r = await stravaAppAPI.post("/push_subscriptions", {
      callback_url: `${STRAVA_WEBHOOK_HOST}/strava/webhook`,
      verify_token: STRAVA_VERIFY_TOKEN,
    });
  } catch (e: any) {
    console.error("Error creating Webhook Subscription", e);
  }
}

async function getWebhookSubscriptionId(): Promise<number | undefined> {
  console.log("Fetching Webhook Subscription");

  try {
    const response = await stravaAppAPI.get("/push_subscriptions");

    const subscriptions: any[] = await response.data;
    if (subscriptions.length === 0) {
      return undefined;
    }
    return subscriptions[0].id;
  } catch (e: any) {
    console.error("Error fetching Webhook Subscription", e);
    return undefined;
  }
}

async function deleteWebhookSubscription(subscriptionId: number) {
  console.log("Deleting Webhook Subscription");

  try {
    await stravaAppAPI.delete(`/push_subscriptions/${subscriptionId}`);
  } catch (e: any) {
    console.error("Error deleting Webhook Subscription", e);
  }
}
