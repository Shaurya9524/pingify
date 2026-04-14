import { worker } from "../utils/wokrer"
import { PostData } from "../types/woker"
import { TypedClient } from "../types/client"
import { xApi } from "../../config/constants"
import { getXUserId, xPostLink } from "../utils/x"

const bearerToken = process.env.X_BEARER_TOKEN

export async function xWorker(client: TypedClient) {
  return worker(client, "X", getLatestXPost)
}

async function getLatestXPost(username: string) {
  const userId = await getXUserId(username)
  if (!userId) return null

  const url = `${xApi}/users/${userId}/tweets?max_results=5&exclude=replies,retweets&tweet.fields=created_at`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${bearerToken}`
    }
  })

  if (!res.ok) return null

  const data = await res.json()
  if (!data || !data.data || data.data.length === 0) return null

  const latestTweetData = data.data[0]
  if (!latestTweetData) return null

  const initPostTitle = latestTweetData.text.split(" ").slice(0, 5).join(" ")
  const postTitle = initPostTitle.length > 40 ? initPostTitle.slice(0, 40) + "..." : initPostTitle

  const latestTweet: PostData = {
    socialName: username,
    postId: latestTweetData.id,
    postTitle: postTitle,
    publishedAt: new Date(latestTweetData.created_at),
    url: xPostLink(username, latestTweetData.id)
  }

  return latestTweet
}
