"use client"

import { Guild } from "@/lib/types/guild"
import { createContext, ReactNode, useContext, useState } from "react"

type GuildContextType = {
  guild?: Guild,
  setGuild: (guild: Guild) => void
}

const GuildContext = createContext<GuildContextType | undefined>(undefined)

export function GuildProvider({ children }: { children: ReactNode }) {
  const [guild, setGuild] = useState<Guild | undefined>()

  return (
    <GuildContext.Provider value={{ guild, setGuild }}>
      {children}
    </GuildContext.Provider>
  )
}

export function useGuildContext() {
  const context = useContext(GuildContext)

  if (!context) {
    throw new Error("useGuildContext must be used within a GuildProvider")
  }

  return context
}
