import { connectDb } from "@/database/utils/connect"
import Subscription from "@/database/models/subscription"
import { SubscriptionDocument } from "@/database/types/subscription"
import { GetSubscriptionsReq, GetSubscriptionsRes } from "@/lib/types/api"

export async function POST(req: Request) {
  const { guildIds, social } = await req.json() as GetSubscriptionsReq

  if (guildIds.length === 0) {
    const response: GetSubscriptionsRes = { error: "Provide atleast one server id" }
    return Response.json(response, { status: 200 })
  }

  try {
    await connectDb()

    const filter = {
      guildId: { $in: guildIds },
      ...(social && { integration: social })
    }
    const subscriptions: SubscriptionDocument[] = await Subscription.find(filter)

    if (!subscriptions || subscriptions.length === 0) {
      const response: GetSubscriptionsRes = { error: "No subscriptions found" }
      return Response.json(response, { status: 200 })
    }

    const response: GetSubscriptionsRes = { subscriptions }
    return Response.json(response, { status: 200 })
  } catch (_) {
    const response: GetSubscriptionsRes = { error: "An error occured while fetching subscriptions" }
    return Response.json(response, { status: 500 })
  }
}
