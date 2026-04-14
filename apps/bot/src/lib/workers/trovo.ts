import { worker } from "../utils/wokrer"
import { PostData } from "../types/woker"
import { TypedClient } from "../types/client"
import { trovoApiUrl } from "../../config/constants"

const clientId = process.env.TROVO_CLIENT_ID

export async function trovoWorker(client: TypedClient) {
  return worker(client, "Trovo", getLatestTrovoStream)
}

async function getLatestTrovoStream(channelName: string): Promise<PostData | null> {
  const res = await fetch(`${trovoApiUrl}/channels/id`, {
    method: "POST",
    headers: {
      "Client-ID": clientId!,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ username: channelName })
  })

  if (!res.ok) return null

  const data = await res.json()
  if (!data || !data.is_live) return null

  const post: PostData = {
    socialName: data.username,
    postId: data.channel_id,
    postTitle: data.live_title,
    publishedAt: new Date(),
    url: data.channel_url
  }

  return post
}
