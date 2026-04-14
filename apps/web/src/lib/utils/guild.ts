import { Guild } from "../types/guild"
import { discordCdn } from "@/config/constants"
import { GetGuildRes, GetGuildsRes } from "../types/api"

export async function fetchGuilds(accessToken: string): Promise<GetGuildsRes> {
  const res = await fetch("/api/guilds/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  if (!res.ok) {
    return { guilds: null, error: "An error occured while fetching the servers" }
  }

  const data: GetGuildsRes = await res.json()
  return data
}

export async function fetchBotGuilds(): Promise<GetGuildsRes> {
  const res = await fetch("/api/guilds/bot")

  if (!res.ok) {
    return { guilds: null, error: "An error occured while fetching the servers" }
  }

  const data: GetGuildsRes = await res.json()
  return data
}

export function getGuildIconUrl({ id, icon }: Guild) {
  return icon ? `${discordCdn}/icons/${id}/${icon}.webp?size=2048` : ""
}

export async function getGuild(guildId: string): Promise<GetGuildRes> {
  const res = await fetch("/api/guild", {
    method: "POST",
    body: JSON.stringify({ guildId }),
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (!res.ok) {
    return { guild: null, error: "An error occured while fetching the server data" }
  }

  const data: GetGuildRes = await res.json()
  return data
}
