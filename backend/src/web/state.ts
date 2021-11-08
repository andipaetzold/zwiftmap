let webhookSubscriptionId: number | undefined;
export function setWebhookSubscriptionId(subscriptionId: number | undefined) {
  webhookSubscriptionId = subscriptionId;
}

export function getWebhookSubscriptionId(): number | undefined {
  return webhookSubscriptionId;
}
