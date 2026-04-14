import { KickUser } from "@/lib/types/kick"
import { kickApi, kickOAuthUrl } from "@/config/constants"
import { GetKickUserReq, GetKickUserRes } from "@/lib/types/api"

type AccessTokenRes = {
  access_token: string,
  expires_in: number,
  token_type: string
}

const client_id = process.env.KICK_CLIENT_ID
const client_secret = process.env.KICK_CLIENT_SECRET

let kickAccessToken = ""
let kickTokenExpires = 0

export async function POST(req: Request) {
  const { username } = await req.json() as GetKickUserReq
  const kickUser = await getKickUser(username)

  if (!kickUser) {
    const response: GetKickUserRes = { error: "Kick user not found" }
    return new Response(JSON.stringify(response), { status: 200 })
  }

  const response: GetKickUserRes = { kickUser }
  return new Response(JSON.stringify(response), { status: 200 })
}

async function getKickUser(username: string): Promise<KickUser | null> {
  const accessToken = await getKickAppAccessToken()
  if (!accessToken) return null

  const userId = await getKickUserId(username)
  if (!userId) return null

  const url = `${kickApi}/users?id=${userId}`
  const res = await fetch(url, {
    headers: {
      "Client-ID": client_id!,
      Authorization: `Bearer ${accessToken}`
    }
  })

  if (!res.ok) return null

  const data = await res.json()

  if (!data.data || data.data.length === 0) {
    return null // username does not exist
  }

  const kickUser: KickUser = {
    userId: data.user_id,
    name: data.name,
    email: data.email,
    profilePictureUrl: data.profile_picture_url
  }

  return kickUser
}

async function getKickAppAccessToken() {
  if (Date.now() < kickTokenExpires && kickAccessToken) return kickAccessToken

  if (!client_id || !client_secret) return null

  const res = await fetch(`${kickOAuthUrl}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id,
      client_secret,
      grant_type: "client_credentials"
    })
  })

  if (!res.ok) return null

  const data = await res.json() as AccessTokenRes
  kickAccessToken = data.access_token
  kickTokenExpires = Date.now() + data.expires_in * 1000

  return kickAccessToken
}

async function getKickUserId(username: string): Promise<string | null> {
  const accessToken = await getKickAppAccessToken()
  if (!accessToken) return null

  const url = `${kickApi}/channels?slug=${username}`
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    }
  })

  if (!res.ok) return null

  const data = await res.json()

  if (!data.data || data.data.length === 0) {
    return null // username does not exist
  }

  const kickUserId = data.data[0].broadcaster_user_id
  return kickUserId
}
