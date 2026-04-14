import { blueskyApi } from "@/config/constants"
import { BlueskyUser } from "@/lib/types/bluesky"
import { GetBlueskyUserReq, GetBlueskyUserRes } from "@/lib/types/api"

export async function POST(req: Request) {
  const { handle } = await req.json() as GetBlueskyUserReq
  const did = await getBlueskyDid(handle)

  if (!did) {
    const response: GetBlueskyUserRes = { error: "Invalid bluesky handle" }
    return new Response(JSON.stringify(response), { status: 200 })
  }

  const url = `${blueskyApi}/app.bsky.actor.getProfile?actor=${did}`
  const res = await fetch(url)

  if (!res.ok) {
    const response: GetBlueskyUserRes = { error: "An error occured while fetching the bluesky user" }
    return new Response(JSON.stringify(response), { status: 200 })
  }

  const data = await res.json()

  if (!data) {
    const response: GetBlueskyUserRes = { error: "Bluesky user not found" }
    return new Response(JSON.stringify(response), { status: 200 })
  }

  const blueskyUser: BlueskyUser = {
    handle: data.handle,
    displayName: data.displayName ? data.displayName : "",
    avatar: data.avatar
  }

  const response: GetBlueskyUserRes = { blueskyUser }
  return new Response(JSON.stringify(response), { status: 200 })
}

async function getBlueskyDid(handle: string) {
  const url = `${blueskyApi}/com.atproto.identity.resolveHandle?handle=${handle}`
  const res = await fetch(url)
  if (!res.ok) return null

  const data = await res.json()
  if (!data) return null

  const did = data.did
  return did
}
