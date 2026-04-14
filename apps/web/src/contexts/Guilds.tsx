"use client"

import { Guild } from "@/lib/types/guild"
import { useGuilds } from "@/lib/hooks/useGuilds"
import { useBotGuilds } from "@/lib/hooks/useBotGuilds"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type GuildsContextType = {
  guilds?: Guild[],
  botGuilds?: Guild[],
  setGuilds: (guilds: Guild[]) => void
  setBotGuilds: (botGuilds: Guild[]) => void
}

const GuildsContext = createContext<GuildsContextType | undefined>(undefined)

export function GuildsProvider({ children }: { children: ReactNode }) {
  const [guilds, setGuilds] = useState<Guild[] | undefined>()
  const [botGuilds, setBotGuilds] = useState<Guild[] | undefined>()
  const { guilds: fetchedGuilds } = useGuilds()
  const { guilds: fetchedBotGuilds } = useBotGuilds()

  useEffect(() => {
    if (!guilds && fetchedGuilds) setGuilds(fetchedGuilds)
  }, [guilds, fetchedGuilds])

  useEffect(() => {
    if (!botGuilds && fetchedBotGuilds) setBotGuilds(fetchedBotGuilds)
  }, [botGuilds, fetchedBotGuilds])

  return (
    <GuildsContext.Provider value={{ guilds, botGuilds, setGuilds, setBotGuilds }}>
      {children}
    </GuildsContext.Provider>
  )
}

export function useGuildsContext() {
  const context = useContext(GuildsContext)

  if (!context) {
    throw new Error("useGuildsContext must be used within a GuildProvider")
  }

  return context
}
