import { GuildLog } from "@/database/models/log"
import { connectDb } from "@/database/utils/connect"
import { GuildLogDocument } from "@/database/types/log"
import { GetLogsReq, GetLogsRes } from "@/lib/types/api"

export async function POST(req: Request) {
  const { guildIds } = await req.json() as GetLogsReq

  try {
    await connectDb()
    const doc: GuildLogDocument[] | null = await GuildLog.find({
      guildId: { $in: guildIds }
    })

    if (!doc) {
      const response: GetLogsRes = { error: "An error occured while fetching the logs" }
      return Response.json(response, { status: 200 })
    }

    const response: GetLogsRes = { logs: doc }
    return Response.json(response, { status: 200 })
  } catch (_) {
    const response: GetLogsRes = { error: "An error occured while fetching the logs" }
    return Response.json(response, { status: 500 })
  }
}
