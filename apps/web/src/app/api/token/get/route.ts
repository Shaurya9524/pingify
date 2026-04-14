import { connectDb } from "@/database/utils/connect"
import DiscordAuthToken from "@/database/models/discord"
import { GetTokenReq, GetTokenRes } from "@/lib/types/api"
import { DiscordAuthTokenDocument } from "@/database/types/discord"

export async function POST(req: Request) {
  const { userId } = await req.json() as GetTokenReq

  try {
    await connectDb()
    const doc: DiscordAuthTokenDocument | null = await DiscordAuthToken.findOne({ userId })

    if (!doc) {
      const response: GetTokenRes = { success: false }
      return Response.json(response, { status: 200 })
    }

    const response: GetTokenRes = { success: true, accessToken: doc.accessToken }
    return Response.json(response, { status: 200 })
  } catch(_) {
    const response: GetTokenRes = { success: false }
    return Response.json(response, { status: 500 })
  }
}
