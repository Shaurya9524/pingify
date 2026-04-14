import { worker } from "../utils/wokrer"
import { PostData } from "../types/woker"
import { TypedClient } from "../types/client"
import { redditUrl } from "../../config/constants"

export async function redditWorker(client: TypedClient) {
  return worker(client, "Reddit", getLatestRedditPost)
}

async function getLatestRedditPost(subredditName: string) {
  const url = `${redditUrl}/r/${subredditName}/new.json?limit=10`
  const res = await fetch(url)
  if (!res.ok) return null

  const data = await res.json()
  if (!data) return null

  const info = data.data.children[0]
  if (!info) return null

  const postInfo = info.data
  const post: PostData = {
    socialName: postInfo.subreddit,
    postId: postInfo.id,
    postTitle: postInfo.title,
    publishedAt: new Date(postInfo.created_utc * 1000),
    url: postInfo.url
  }

  return post
}
