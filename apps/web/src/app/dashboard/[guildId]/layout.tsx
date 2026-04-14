"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useGuild } from "@/lib/hooks/useGuild"
import { GuildProvider, useGuildContext } from "@/contexts/Guild"
import styles from "@/styles/main/dashboard.module.css"

function GuildInitializer({ children }: { children: React.ReactNode }) {
  const { serverId } = useParams<{ serverId: string }>()
  const { guild, setGuild } = useGuildContext()
  const { guild: fetchedGuild, loading } = useGuild(serverId)

  useEffect(() => {
    if (fetchedGuild && !guild) setGuild(fetchedGuild)
  }, [fetchedGuild, guild, setGuild])

  if (loading) return <div className={styles.dashboard}>Loading...</div>

  return <>{children}</>
}

export default function ServerDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <GuildProvider>
      <GuildInitializer>
        {children}
      </GuildInitializer>
    </GuildProvider>
  )
}
