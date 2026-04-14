import { connectDb } from "@/database/utils/connect"
import Subscription from "@/database/models/subscription"
import { UnsubscribeReq, UnsubscribeRes } from "@/lib/types/api"
import { SubscriptionDocument } from "@/database/types/subscription"

export async function POST(req: Request) {
  console.log("unsubscribing")
  const { subscriptionDocId } = await req.json() as UnsubscribeReq

  try {
    await connectDb()

    const doc: SubscriptionDocument | null = await Subscription.findOne({ _id: subscriptionDocId })
    console.log("doc: ", doc)

    if (!doc) {
      const response: UnsubscribeRes = { error: true, message: "Subscription not found" }
      return Response.json(response, { status: 200 })
    }

    await doc.deleteOne()
    const response: UnsubscribeRes = { error: false, message: "Subscription deleted" }
    return Response.json(response, { status: 200 })
  } catch (_) {
    const response: UnsubscribeRes = { error: true, message: "An error occured while unsubscribing" }
    return Response.json(response, { status: 500 })
  }
}
