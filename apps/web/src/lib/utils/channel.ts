import { GetChannelRes, GetGuildChannelsRes } from "../types/api"

export async function getChannel(channelId: string): Promise<GetChannelRes> {
  const res = await fetch("/api/channel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ channelId })
  })
  const data = await res.json() as GetChannelRes
  return data
}

export async function getGuildChannels(guildId: string): Promise<GetGuildChannelsRes> {
  const res = await fetch("/api/guild/channels", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ guildId })
  })
  const data = await res.json() as GetGuildChannelsRes
  return data
}
