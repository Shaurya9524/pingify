import { GetBlueskyUserRes } from "../types/api"

export async function getBlueskyUser(handle: string): Promise<GetBlueskyUserRes | null> {
  const res = await fetch("/api/bluesky/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ handle })
  })

  const data: GetBlueskyUserRes = await res.json()
  return data
}
