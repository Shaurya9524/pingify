import { blueskyApi, blueskyUrl } from "../../config/constants"

export async function getBlueskyDid(handle: string) {
  const url = `${blueskyApi}/com.atproto.identity.resolveHandle?handle=${handle}`
  const res = await fetch(url)
  if (!res.ok) return null

  const data = await res.json()
  if (!data) return null

  const did = data.did
  return did
}

export function blueskyPostLink(uri: string, handle: string) {
  const postId = extractBlueskyPostId(uri)
  const link = `${blueskyUrl}/profile/${handle}/post/${postId}`
  return link
}

export function extractBlueskyPostId(uri: string) {
  const parts = uri.split("/")
  return parts[parts.length - 1]
}
