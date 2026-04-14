import { GetLogsRes } from "../types/api"

export async function fetchLogs(guildIds: string[]): Promise<GetLogsRes> {
  const res = await fetch("/api/logs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ guildIds })
  })
  const data = await res.json() as GetLogsRes
  return data
}
