import { GetKickUserRes } from "../types/api"

export async function getKickUser(username: string): Promise<GetKickUserRes | null> {
  const res = await fetch("/api/kick/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username })
  })

  const data: GetKickUserRes = await res.json()
  return data
}
