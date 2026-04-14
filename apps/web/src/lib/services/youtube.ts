import { GetYouTubeChannelRes } from "../types/api"

export async function getYouTubeChannel(channelId: string): Promise<GetYouTubeChannelRes | null> {
  const res = await fetch("/api/youtube/channel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ channelId })
  })

  const data: GetYouTubeChannelRes = await res.json()
  return data
}
