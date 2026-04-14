import { worker } from "../utils/wokrer"
import { PostData } from "../types/woker"
import { TypedClient } from "../types/client"
import { kickApi } from "../../config/constants"
import { getKickAppAccessToken, getKickUserId, kickStreamLink } from "../utils/kick"

export async function kickWorker(client: TypedClient) {
  return worker(client, "Kick", getLatestKickStream)
}

async function getLatestKickStream(username: string) {
  const accessToken = await getKickAppAccessToken()
  if (!accessToken) return null

  const userId = await getKickUserId(username)
  if (!userId) return null

  const url = `${kickApi}/livestreams?broadcaster_user_id=${userId}`
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    }
  })

  if (!res.ok) return null

  const data = await res.json()
  if (!data) return null

  const info = data.data[0]
  if (!info) return null

  const post: PostData = {
    socialName: info.slug,
    postId: info.started_at,
    postTitle: info.stream_title,
    publishedAt: new Date(info.started_at),
    url: kickStreamLink(username)
  }

  return post
}
