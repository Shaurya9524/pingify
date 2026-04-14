import { log } from "./console"
import { twitchApi, twitchOAuthUrl } from "../../config/constants"

type AccessTokenRes = {
  access_token: string,
  expires_in: number,
  token_type: string
}

const client_id = process.env.TWITCH_CLIENT_ID
const client_secret = process.env.TWITCH_CLIENT_SECRET

let twitchAccessToken = ""
let twitchTokenExpires = 0

export async function getTwitchAppAccessToken() {
  if (Date.now() < twitchTokenExpires && twitchAccessToken) return twitchAccessToken

  if (!client_id || !client_secret) {
    log({ type: "error", label: "ENV missing" }, "Twitch client credentials missing")
    return null
  }

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

export async function getTwitchUserId(username: string): Promise<string | null> {
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

  const twitchUserId = data.data[0].id
  return twitchUserId
}

export const twitchStreamLink = (username: string) => `https://twitch.tv/${username}`
