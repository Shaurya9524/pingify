import { connectDb } from "@/database/utils/connect"
import Subscription from "@/database/models/subscription"
import { SubscribeReq, SubscribeRes } from "@/lib/types/api"
import { SubscriptionDocument } from "@/database/types/subscription"

export async function POST(req: Request) {
  const { subscriptionData } = await req.json() as SubscribeReq
  const { integration, socialId, notificationChannelId } = subscriptionData

  try {
    await connectDb()

    const existingDoc: SubscriptionDocument | null = await Subscription.findOne({ integration, socialId, notificationChannelId })

    if (existingDoc) {
      const response: SubscribeRes = { error: true, message: "You're already subscribed to that channel" }
      return Response.json(response, { status: 200 })
    }

    await Subscription.create(subscriptionData)
    const response: SubscribeRes = { subscribed: true, message: "Subscription added" }
    return Response.json(response, { status: 200 })
  } catch (_) {
    const response: SubscribeRes = { error: true, message: "An error occured while subscribing" }
    return Response.json(response, { status: 500 })
  }
}
