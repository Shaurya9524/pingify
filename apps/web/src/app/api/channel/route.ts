import { discordApi } from "@/config/constants"
import { DiscordChannel } from "@/lib/types/channel"
import { GetChannelReq, GetChannelRes } from "@/lib/types/api"

const token = process.env.DISCORD_CLIENT_TOKEN

export async function POST(req: Request) {
  const { channelId } = await req.json() as GetChannelReq

  try {
    if (!token) {
      const response: GetChannelRes = { channel: null, error: "Missing bot token environment variable" }
      return Response.json(response, { status: 200 })
    }

    const url = `${discordApi}/channels/${channelId}`
    const res = await fetch(url, {
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json"
      }
    })

    if (!res.ok) {
      const response: GetChannelRes = {
        channel: null,
        error: res.statusText === "Not Found" ? "Not Found" : "An error occured while fetching the channel"
      }
      return Response.json(response, { status: 500 })
    }

    const channel: DiscordChannel = await res.json()
    const response: GetChannelRes = { channel, error: null }
    return Response.json(response, { status: 200 })
  } catch (_) {
    const response: GetChannelRes = { channel: null, error: "An error occured while fetching the channel" }
    return Response.json(response, { status: 500 })
  }
}