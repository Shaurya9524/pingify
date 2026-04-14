import { youtubeApi } from "@/config/constants"
import { YouTubeChannel } from "@/lib/types/youtube"
import { GetYouTubeChannelReq, GetYouTubeChannelRes } from "@/lib/types/api"

const apiKey = process.env.YOUTUBE_API_KEY

export async function POST(req: Request) {
  const { channelId } = await req.json() as GetYouTubeChannelReq
  const url = `${youtubeApi}/channels?part=snippet&id=${channelId}&key=${apiKey}`
  const res = await fetch(url)

  if (!res.ok) {
    const response: GetYouTubeChannelRes = { error: "An error occured while fetching the channel" }
    return new Response(JSON.stringify(response), { status: 200 })
  }

  const data = await res.json()
  const channel: YouTubeChannel = data?.items?.[0].snippet

  const response: GetYouTubeChannelRes = { channel, error: !channel ? "An error occured while fetching the channel" : undefined }
  return new Response(JSON.stringify(response), { status: 200 })
}
