import { SubscribeRes } from "@/lib/types/api"
import { ISubscription } from "../types/subscription"

export async function subscribe(subscriptionData: ISubscription): Promise<SubscribeRes> {
  const res = await fetch("/api/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ subscriptionData })
  })

  const data: SubscribeRes = await res.json()
  return data
}
