import { GetXUserRes } from "../types/api"

export async function getXUser(username: string): Promise<GetXUserRes | null> {
  const res = await fetch("/api/x/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username })
  })

  const data: GetXUserRes = await res.json()
  return data
}
