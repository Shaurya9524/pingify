import { log } from "../utils/console"
import { worker } from "../utils/wokrer"
import { PostData } from "../types/woker"
import { TypedClient } from "../types/client"
import { twitchApi } from "../../config/constants"
import { getTwitchAppAccessToken, getTwitchUserId, twitchStreamLink } from "../utils/twitch"

const twitchClientId = process.env.TWITCH_CLIENT_ID

export async function twitchWorker(client: TypedClient) {
  if (!twitchClientId) {
    log({ type: "error", label: "ENV missing" }, "Twitch client credentials missing")
    return
  }

  return worker(client, "Twitch", getLatestTwitchStream)
}

async function getLatestTwitchStream(username: string): Promise<PostData | null> {
  const accessToken = await getTwitchAppAccessToken()
  if (!accessToken) return null

  const userId = await getTwitchUserId(username)
  if (!userId) return null

  const url = `${twitchApi}/streams?user_id=${userId}`
  const res = await fetch(url, {
    headers: {
      "Client-ID": twitchClientId!,
      Authorization: `Bearer ${accessToken}`
    }
  })

  if (!res.ok) return null

  const data = await res.json()
  if (!data.data?.length) return null

  const stream = data.data[0]
  return {
    socialName: stream.user_name,
    postId: stream.id,
    postTitle: stream.title,
    publishedAt: new Date(stream.started_at),
    url: twitchStreamLink(stream.user_login)
  }
}
