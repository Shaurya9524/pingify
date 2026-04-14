import { trovoApiUrl } from "@/config/constants"
import { TrovoChannel } from "@/lib/types/trovo"
import { GetTrovoChannelReq, GetTrovoChannelRes } from "@/lib/types/api"

const clientId = process.env.TROVO_CLIENT_ID

export async function POST(req: Request) {
  const { username } = await req.json() as GetTrovoChannelReq
  const url = `${trovoApiUrl}/channels/id`
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Client-ID": clientId!,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ username })
  })

  if (!res.ok) {
    const response: GetTrovoChannelRes = { error: "An error occured while fetching the channel" }
    return new Response(JSON.stringify(response), { status: 200 })
  }

  const data = await res.json()
  const channel: TrovoChannel = {
    channelId: data.channel_id,
    username: data.username
  }

  const response: GetTrovoChannelRes = { channel, error: !channel ? "An error occured while fetching the channel" : undefined }
  return new Response(JSON.stringify(response), { status: 200 })
}
