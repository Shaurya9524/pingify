import { ISubscription } from "../types/subscription"
import { UpdateSubscriptionRes } from "@/lib/types/api"

export async function updateSubscription(subscriptionId: string, updates: Partial<ISubscription>): Promise<UpdateSubscriptionRes> {
  const res = await fetch("/api/subscription/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ subscriptionId, updates })
  })

  return res.json()
}
