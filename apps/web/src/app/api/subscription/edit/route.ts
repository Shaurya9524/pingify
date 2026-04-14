import { connectDb } from "@/database/utils/connect"
import Subscription from "@/database/models/subscription"
import { SubscriptionDocument } from "@/database/types/subscription"
import { UpdateSubscriptionReq, UpdateSubscriptionRes } from "@/lib/types/api"

export async function POST(req: Request) {
  const { subscriptionId, updates } = await req.json() as UpdateSubscriptionReq

  if (!subscriptionId) {
    const response: UpdateSubscriptionRes = { error: "Provide a subscription id" }
    return Response.json(response, { status: 400 })
  }

  if (!updates || Object.keys(updates).length === 0) {
    const response: UpdateSubscriptionRes = { error: "Provide atleast one field to update" }
    return Response.json(response, { status: 400 })
  }

  try {
    await connectDb()

    const subscription: SubscriptionDocument | null = await Subscription.findByIdAndUpdate(subscriptionId, { $set: updates }, { new: true })

    if (!subscription) {
      const response: UpdateSubscriptionRes = { error: "Subscription not found" }
      return Response.json(response, { status: 404 })
    }

    const response: UpdateSubscriptionRes = { subscription }
    return Response.json(response, { status: 200 })
  } catch (_) {
    const response: UpdateSubscriptionRes = { error: "An error occured while updating subscription" }
    return Response.json(response, { status: 500 })
  }
}