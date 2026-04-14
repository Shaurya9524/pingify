import { fetchLogs } from "../utils/logs"
import { useEffect, useState } from "react"
import { IGuildLog } from "@/database/types/log"
import { useGuildsContext } from "@/contexts/Guilds"

export function useLogs() {
  const { guilds } = useGuildsContext()
  const [logs, setLogs] = useState<IGuildLog[]>([])

  useEffect(() => {
    async function getLogs() {
      if (!guilds) return
      const { logs } = await fetchLogs(guilds.map(g => g.id))
      if (logs) setLogs(logs)
    }

    getLogs()
  }, [guilds])

  return { logs }
}
