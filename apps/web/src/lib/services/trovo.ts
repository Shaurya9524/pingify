import { GetTrovoChannelRes } from "../types/api"

export async function getTrovoChannel(username: string): Promise<GetTrovoChannelRes | null> {
  const res = await fetch("/api/trovo/channel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username })
  })

  const data: GetTrovoChannelRes = await res.json()
  return data
}
