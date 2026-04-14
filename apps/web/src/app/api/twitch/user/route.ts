import { TwitchUser } from "@/lib/types/twitch"
import { twitchApi, twitchOAuthUrl } from "@/config/constants"
import { GetTwitchUserReq, GetTwitchUserRes } from "@/lib/types/api"

type AccessTokenRes = {
  access_token: string,
  expires_in: number,
  token_type: string
}

const client_id = process.env.TWITCH_CLIENT_ID
const client_secret = process.env.TWITCH_CLIENT_SECRET

let twitchAccessToken = ""
let twitchTokenExpires = 0

export async function POST(req: Request) {
  const { username } = await req.json() as GetTwitchUserReq
  const twitchUser = await getTwitchUser(username)

  if (!twitchUser) {
    const response: GetTwitchUserRes = { error: "Twitch user not found" }
    return new Response(JSON.stringify(response), { status: 200 })
  }

  const response: GetTwitchUserRes = { twitchUser }
  return new Response(JSON.stringify(response), { status: 200 })
}

async function getTwitchUser(username: string): Promise<TwitchUser | null> {
  const accessToken = await getTwitchAppAccessToken()
  if (!accessToken) return null

  const url = `${twitchApi}/users?login=${username}`
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

  const twitchUser: TwitchUser = {
    id: data.id,
    username: data.login,
    displayName: data.displayN_name,
    description: data.description,
    profileImageUrl: data.profile_image_url
  }

  return twitchUser
}

async function getTwitchAppAccessToken() {
  if (Date.now() < twitchTokenExpires && twitchAccessToken) return twitchAccessToken

  if (!client_id || !client_secret) return null

  const res = await fetch(`${twitchOAuthUrl}/token`, {
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
  twitchAccessToken = data.access_token
  twitchTokenExpires = Date.now() + data.expires_in * 1000

  return twitchAccessToken
}
