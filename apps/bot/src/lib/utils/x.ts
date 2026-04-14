import { log } from "./console"
import { xApi, xUrl } from "../../config/constants"

const bearerToken = process.env.X_BEARER_TOKEN

export async function getXUserId(username: string) {
  if (!bearerToken) {
    log({ type: "error", label: "ENV missing" }, "X bearer missing")
    return null
  }

  const res = await fetch(`${xApi}/users/by/username/${username}`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`
    }
  })

  if (!res.ok) return null

  const data = await res.json()
  const userId = data.data?.id ?? null
  return userId
}

export const xPostLink = (username:string, postId: string) => `${xUrl}/${username}/status/${postId}`
