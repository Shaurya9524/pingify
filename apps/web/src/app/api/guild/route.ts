import { Guild } from "@/lib/types/guild"
import { discordApi } from "@/config/constants"
import { GetGuildReq, GetGuildRes } from "@/lib/types/api"

const token = process.env.DISCORD_CLIENT_TOKEN

export async function POST(req: Request) {
  const { guildId } = await req.json() as GetGuildReq

  try {
    if (!token) {
      const response: GetGuildRes = { guild: null, error: "Missing bot token environment variable" }
      return Response.json(response, { status: 200 })
    }

    const url = `${discordApi}/guilds/${guildId}?with_counts=true`
    const res = await fetch(url, {
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json",
      }
    })

    if (!res.ok) {
      const response: GetGuildRes = { guild: null, error: "An error occured while fetching the server" }
      return Response.json(response, { status: 500 })
    }

    const guild: Guild = await res.json()
    const response: GetGuildRes = { guild, error: null }
    return Response.json(response, { status: 200 })
  } catch (_) {
    const response: GetGuildRes = { guild: null, error: "An error occured while fetching the server" }
    return Response.json(response, { status: 500 })
  }
}
