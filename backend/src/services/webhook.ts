import FormData from "form-data";
import fetch from "node-fetch";
import {
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
  STRAVA_VERIFY_TOKEN,
  STRAVA_WEBHOOK_HOST,
} from "../config";

export async function setupWebhook() {
  const subscriptionId = await getWebhookSubscriptionId();
  if (subscriptionId) {
    await deleteWebhookSubscription(subscriptionId);
  }
  await createWebhookSubscription();
}

async function createWebhookSubscription() {
  console.log("Creating Webhook Subscription");

  const form = new FormData();
  form.append("client_id", STRAVA_CLIENT_ID);
  form.append("client_secret", STRAVA_CLIENT_SECRET);
  form.append("callback_url", `${STRAVA_WEBHOOK_HOST}/strava/webhook`);
  form.append("verify_token", STRAVA_VERIFY_TOKEN);

  const response = await fetch(
    "https://www.strava.com/api/v3/push_subscriptions",
    {
      method: "POST",
      body: form,
    }
  );
}

async function getWebhookSubscriptionId(): Promise<number | undefined> {
  console.log("Fetching Webhook Subscription");

  // @ts-ignore
  const params = new URLSearchParams();
  params.append("client_id", STRAVA_CLIENT_ID);
  params.append("client_secret", STRAVA_CLIENT_SECRET);

  const response = await fetch(
    `https://www.strava.com/api/v3/push_subscriptions?${params.toString()}`
  );

  if (response.ok) {
    const subscriptions = await response.json();
    if (subscriptions.lenth === 0) {
      return undefined;
    }
    return subscriptions[0].id;
  } else {
    return undefined;
  }
}

async function deleteWebhookSubscription(subscriptionId: number) {
  console.log("Deleting Webhook Subscription");

  const form = new FormData();
  form.append("client_id", STRAVA_CLIENT_ID);
  form.append("client_secret", STRAVA_CLIENT_SECRET);

  await fetch(
    `https://www.strava.com/api/v3/push_subscriptions/${subscriptionId}`,
    {
      method: "DELETE",
      body: form,
    }
  );
}
