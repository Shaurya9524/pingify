import { supabase } from "./supabase"
import { GetTokenReq, GetTokenRes } from "../types/api"

export async function signInWithDiscord() {
  const { data, error } = await supabase.auth.signInWithOAuth({ provider: "discord", options: { scopes: "identify guilds" } })
  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getDiscordAccessToken(userId: string) {
  const postData: GetTokenReq = { userId }

  const res = await fetch("/api/token/get", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: { "Content-Type": "application/json" }
  })

  const { accessToken } = await res.json() as GetTokenRes
  return accessToken
}
