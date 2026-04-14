import { connectDb } from "@/database/utils/connect"
import DiscordAuthToken from "@/database/models/discord"
import { SaveTokenReq, SaveTokenRes } from "@/lib/types/api"
import { DiscordAuthTokenDocument } from "@/database/types/discord"

export async function POST(req: Request) {
  const { userId, accessToken } = await req.json() as SaveTokenReq

  try {
    await connectDb()
    const existingDoc: DiscordAuthTokenDocument | null = await DiscordAuthToken.findOne({ userId })
    const createdAt = existingDoc?.createdAt?.getTime() as number | undefined
    const expired = createdAt ? Math.floor(Date.now() - createdAt) / 1000 > 518400 : false // 6 days

    if (existingDoc) {
      if (!expired) {
        const response: SaveTokenRes = { saved: false, message: "Access token already exists" }
        return Response.json(response, { status: 200 })
      } else {
        existingDoc.accessToken = accessToken
        await existingDoc.save()
        const response: SaveTokenRes = { saved: true, message: "Access token updated successfully" }
        return Response.json(response, { status: 200 })
      }
    }

    await DiscordAuthToken.create({ userId, accessToken })
    const response: SaveTokenRes = { saved: true, message: "Access token saved successfully" }
    return Response.json(response, { status: 200 })
  } catch (_) {
    const response: SaveTokenRes = { saved: false, message: "An error occured while saving the token" }
    return Response.json(response, { status: 500 })
  }
}
