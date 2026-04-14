import { headers } from "next/headers"
import { Guild } from "@/lib/types/guild"
import { GetGuildsRes } from "@/lib/types/api"
import { discordApi } from "@/config/constants"

export async function GET() {
  try {
    const headersList = await headers()
    const Authorization = headersList.get("authorization")

    if (!Authorization) {
      const response: GetGuildsRes = { guilds: null, error: "Missing authorization header" }
      return Response.json(response, { status: 401 })
    }

    const url = `${discordApi}/users/@me/guilds`
    const res = await fetch(url, {
      headers: {
        Authorization,
        "Content-Type": "application/json",
      }
    })

    if (!res.ok) {
      const response: GetGuildsRes = { guilds: null, error: "An error occured while fetching the servers" }
      return Response.json(response, { status: 500 })
    }

    const guilds: Guild[] = await res.json()
    const ownedGuilds = guilds.filter(guild => guild.owner)
    const response: GetGuildsRes = { guilds: ownedGuilds, error: null }
    return Response.json(response, { status: 200 })
  } catch (_) {
    const response: GetGuildsRes = { guilds: null, error: "An error occured while fetching the servers" }
    return Response.json(response, { status: 500 })
  }
}
