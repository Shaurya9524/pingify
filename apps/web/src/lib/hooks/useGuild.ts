"use client"

import { Guild } from "../types/guild"
import { getGuild } from "../utils/guild"
import { useEffect, useState } from "react"

export function useGuild(guildId: string) {
  const [guild, setGuild] = useState<Guild>()
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    const fetchGuild = async () => {
      setLoading(true)
      const { guild, error } = await getGuild(guildId)

      if (error || !guild) {
        setErrorMessage("An error occured while fetching the guild")
        setLoading(false)
        return
      }

      setGuild(guild)
      setLoading(false)
    }

    fetchGuild()
  }, [guildId])

  return { guild, loading, errorMessage }
}
