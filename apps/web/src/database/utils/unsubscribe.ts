import { UnsubscribeRes } from "@/lib/types/api"

export async function unsubscribe(subscriptionDocId: string): Promise<UnsubscribeRes> {
  const res = await fetch("/api/unsubscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ subscriptionDocId })
  })

  const data: UnsubscribeRes = await res.json()
  return data
}
