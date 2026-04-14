"use client"

import { useUser } from "./useUser"
import { Guild } from "../types/guild"
import { useEffect, useState } from "react"
import { fetchGuilds } from "../utils/guild"
import { DiscordMetadata } from "../types/user"
import { getDiscordAccessToken } from "../auth/discord"

export function useGuilds() {
  const { user } = useUser()
  const [guilds, setGuilds] = useState<Guild[]>()
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string>()
  const userData = user?.user_metadata as DiscordMetadata | null
  const userId = userData?.provider_id

  useEffect(() => {
    setLoading(true)
    if (!user || !userId) return

    const fetchAccessToken = async () => {
      const accessToken = await getDiscordAccessToken(userId)

      if (accessToken) {
        const { guilds, error } = await fetchGuilds(accessToken)
        setLoading(false)

        if (error) {
          setErrorMessage(error)
          return
        }

        if (guilds) {
          setGuilds(guilds)
          return
        }

        setErrorMessage("An error occured while fetching the servers")
      }
    }

    fetchAccessToken()
  }, [user, userId])

  return { guilds, loading, errorMessage }
}
