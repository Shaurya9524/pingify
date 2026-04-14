"use client"

import { Guild } from "../types/guild"
import { useEffect, useState } from "react"
import { fetchBotGuilds } from "../utils/guild"

export function useBotGuilds() {
  const [loading, setLoading] = useState(true)
  const [guilds, setGuilds] = useState<Guild[]>()
  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    setLoading(true)

    const getBotGuilds = async () => {
      const { guilds, error } = await fetchBotGuilds()
      setLoading(false)

      if (error) {
        setErrorMessage(error)
        return
      }

      if (guilds) {
        setGuilds(guilds)
      }
    }

    getBotGuilds()
  }, [])

  return { loading, guilds, errorMessage }
}
