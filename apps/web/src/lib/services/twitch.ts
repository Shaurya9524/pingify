import { GetTwitchUserRes } from "../types/api"

export async function getTwitchUser(username: string): Promise<GetTwitchUserRes | null> {
  const res = await fetch("/api/twitch/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username })
  })

  const data: GetTwitchUserRes = await res.json()
  return data
}
