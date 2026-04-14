import { log } from "./console"
import { kickApi, kickOAuthUrl } from "../../config/constants"

type AccessTokenRes = {
  access_token: string,
  expires_in: number,
  token_type: string
}

const client_id = process.env.KICK_CLIENT_ID
const client_secret = process.env.KICK_CLIENT_SECRET

let kickAccessToken = ""
let kickTokenExpires = 0

export async function getKickAppAccessToken() {
  if (Date.now() < kickTokenExpires && kickAccessToken) return kickAccessToken

  if (!client_id || !client_secret) {
    log({ type: "error", label: "ENV missing" }, "Kick client credentials missing")
    return null
  }

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

export async function getKickUserId(username: string): Promise<string | null> {
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

export const kickStreamLink = (username: string) => `https://kick.com/${username}`
