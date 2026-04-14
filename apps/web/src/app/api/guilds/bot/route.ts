import { Guild } from "@/lib/types/guild"
import { GetGuildsRes } from "@/lib/types/api"
import { discordApi } from "@/config/constants"

export async function GET() {
  try {
    const token = process.env.DISCORD_CLIENT_TOKEN

    if (!token) {
      const response: GetGuildsRes = { guilds: null, error: "Missing bot token environment variable" }
      return Response.json(response, { status: 200 })
    }

    const url = `${discordApi}/users/@me/guilds`
    const res = await fetch(url, {
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json",
      }
    })

    if (!res.ok) {
      const response: GetGuildsRes = { guilds: null, error: "An error occured while fetching the servers" }
      return Response.json(response, { status: 500 })
    }

    const guilds: Guild[] = await res.json()
    const response: GetGuildsRes = { guilds, error: null }
    return Response.json(response, { status: 200 })
  } catch (err) {
    console.log("internal server error: ", err)
    const response: GetGuildsRes = { guilds: null, error: "An error occured while fetching the servers" }
    return Response.json(response, { status: 500 })
  }
}
