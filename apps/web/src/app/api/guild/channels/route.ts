import { discordApi } from "@/config/constants"
import { DiscordChannel } from "@/lib/types/channel"
import { GetGuildChannelsReq, GetGuildChannelsRes } from "@/lib/types/api"

const token = process.env.DISCORD_CLIENT_TOKEN

export async function POST(req: Request) {
  const { guildId } = await req.json() as GetGuildChannelsReq

  try {
    if (!token) {
      const response: GetGuildChannelsRes = { error: "Missing bot token environment variable" }
      return Response.json(response, { status: 200 })
    }

    const url = `${discordApi}/guilds/${guildId}/channels`
    const res = await fetch(url, {
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json"
      }
    })

    if (!res.ok) {
      const response: GetGuildChannelsRes = { error: "An error occured while fetching the server" }
      return Response.json(response, { status: 500 })
    }

    const channels = await res.json() as DiscordChannel[]
    const response: GetGuildChannelsRes = { channels }
    return Response.json(response, { status: 200 })
  } catch (_) {
    const response: GetGuildChannelsRes = { error: "An error occured while fetching the server" }
    return Response.json(response, { status: 500 })
  }
}
