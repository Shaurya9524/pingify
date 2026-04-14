import { GetSubscriptionsRes } from "../types/api"
import { Integration } from "../types/integration"
import { GroupedSubscriptions } from "../types/subscription"
import { SubscriptionDocument } from "@/database/types/subscription"

export async function getSubscriptions(guildIds: string[], social?: Integration): Promise<GetSubscriptionsRes> {
  const res = await fetch("/api/subscriptions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ guildIds, social })
  })
  const data = await res.json() as GetSubscriptionsRes
  return data
}

export function groupSubscriptionsByGuildId(subscriptions: SubscriptionDocument[]): GroupedSubscriptions {
  return subscriptions?.reduce<Record<string, SubscriptionDocument[]>>((acc, sub) => {
    if (!acc[sub.guildId]) {
      acc[sub.guildId] = []
    }

    acc[sub.guildId].push(sub)
    return acc
  }, {})
}

export function groupSubscriptionsByIntegration(subscriptions: SubscriptionDocument[], integration: Integration): GroupedSubscriptions {
  return subscriptions?.reduce<Record<string, SubscriptionDocument[]>>((acc, sub) => {
    if (!acc[integration]) {
      acc[integration] = []
    }

    acc[integration].push(sub)
    return acc
  }, {})
}
