import { worker } from "../utils/wokrer"
import { PostData } from "../types/woker"
import { TypedClient } from "../types/client"
import { blueskyApi } from "../../config/constants"
import { blueskyPostLink, extractBlueskyPostId, getBlueskyDid } from "../utils/bluesky"

export async function blueskyWorker(client: TypedClient) {
  return worker(client, "Bluesky", getLatestBlueskyPost)
}

async function getLatestBlueskyPost(handle: string) {
  const did = await getBlueskyDid(handle)
  if (!did) return null

  const url = `${blueskyApi}/app.bsky.feed.getAuthorFeed?actor=${did}&limit=1`
  const res = await fetch(url)
  if (!res.ok) return null

  const data = await res.json()
  if (!data) return null

  const info = data.feed[0]?.post
  if (!info) return null

  const authorInfo = info.author
  const postInfo = info.record
  const initPostTitle = postInfo.text.split(" ").slice(0, 5).join(" ")
  const postTitle = initPostTitle.length > 40 ? initPostTitle.slice(0, 40) + "..." : initPostTitle

  const post: PostData = {
    socialName: authorInfo.displayName || authorInfo.handle,
    postId: extractBlueskyPostId(info.uri),
    postTitle: postTitle,
    publishedAt: new Date(postInfo.createdAt),
    url: blueskyPostLink(info.uri, handle)
  }

  return post
}
