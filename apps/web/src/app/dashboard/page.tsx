"use client"

import Link from "next/link"
import { botConfig } from "@/config/bot"
import { Guild } from "@/lib/types/guild"
import { useGuilds } from "@/lib/hooks/useGuilds"
import AuthRoute from "@/components/auth/AuthRoute"
import { useGuildsContext } from "@/contexts/Guilds"
import { useEffect, useMemo, useState } from "react"
import { useBotGuilds } from "@/lib/hooks/useBotGuilds"
import { useSubscriptions } from "@/lib/hooks/useSubscriptions"
import { SubscriptionDocument } from "@/database/types/subscription"
import { groupSubscriptionsByGuildId } from "@/lib/utils/subscriptions"
import { GuildCard, GuildCardSkeleton } from "@/components/ui/GuildCard"
import { GuildSubscriptionsCard, GuildSubscriptionsCardSkeleton } from "@/components/ui/GuildSubscriptionsCard"
import styles from "@/styles/main/dashboard.module.css"

const { botInvite } = botConfig

export default function Dashboard() {
  const { guilds: fetchedGuilds, loading } = useGuilds()

  return (
    <AuthRoute className={styles.dashboard}>
      <h1>Dashboard</h1> <br /> <br />
      <div>{
        loading || fetchedGuilds ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
            <GuildsSection fetchedGuilds={fetchedGuilds} />
            <SubscriptionsSection fetchedGuilds={fetchedGuilds} />
          </div>
        ) : <div>Session expired, please login again to access the dashboard</div>
      }</div>
    </AuthRoute>
  )
}

function GuildsSection({ fetchedGuilds }: { fetchedGuilds?: Guild[] }) {
  const { guilds: fetchedBotGuilds } = useBotGuilds()
  const { guilds, botGuilds, setGuilds, setBotGuilds } = useGuildsContext()
  const [{ visible, x, y }, setTooltip] = useState({ visible: false, x: 0, y: 0 })

  useEffect(() => {
    if (!guilds && fetchedGuilds) setGuilds(fetchedGuilds)
    if (!botGuilds && fetchedBotGuilds) setBotGuilds(fetchedBotGuilds)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedGuilds, fetchedBotGuilds])

  function renderGuilds() {
    return (guilds || Array.from({ length: 4 })).map((guild, i) => {
      const botInGuild = botGuilds?.some(g => g.id === guild?.id)
      const cardLink = botInGuild ? `/dashboard/${guild?.id}` : `${botInvite}&guild_id=${guild?.id}&disable_guild_select=true`

      const handleMouseEnter = (e: React.MouseEvent) => {
        if (botInGuild) return
        setTooltip({
          visible: true,
          x: e.clientX,
          y: e.clientY
        })
      }

      const handleMouseMove = (e: React.MouseEvent) => {
        if (botInGuild) return
        setTooltip(prev => ({
          ...prev,
          x: e.clientX,
          y: e.clientY
        }))
      }

      const handleMouseLeave = () => {
        if (botInGuild) return
        setTooltip(prev => ({ ...prev, visible: false }))
      }

      return guild ? (
        <Link
          key={i}
          href={cardLink}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <GuildCard guild={guild} grayscale={!botInGuild} />
        </Link>
      ) : <GuildCardSkeleton key={i} />
    })
  }

  return <div>
    <h2>My Servers</h2>
    <br />
    <div className={styles.guilds}>
      {renderGuilds()}
      {visible && (
        <div className={styles.tooltip} style={{ top: y + 12, left: x + 12 }}>
          Click to invite Pingify to the server
        </div>
      )}
    </div>
  </div>
}

function SubscriptionsSection({ fetchedGuilds }: { fetchedGuilds?: Guild[] }) {
  const guildIds = useMemo(() => fetchedGuilds?.map(g => g.id) ?? [], [fetchedGuilds])
  const { subscriptions, loading } = useSubscriptions(guildIds)

  function renderSkeletons() {
    return Array.from({ length: 3 }).map((_, i) => (
      <GuildSubscriptionsCardSkeleton key={i} />
    ))
  }

  function renderGuildsSubscriptions(subscriptions: SubscriptionDocument[]) {
    const groupedSubscriptions = groupSubscriptionsByGuildId(subscriptions)
    const groups = Object.values(groupedSubscriptions)

    return groups?.map((subscriptions, i) => (
      <GuildSubscriptionsCard key={i} subscriptions={subscriptions} enableSkeleton />
    ))
  }

  return (
    <div>
      <h2>Subscriptions</h2>
      <br />
      <div style={{ display: "flex", gap: 30, flexWrap: "wrap" }}>
        {
          loading || !fetchedGuilds
            ? renderSkeletons()
            : subscriptions
              ? renderGuildsSubscriptions(subscriptions)
              : "You don't have any active subscriptions"
        }
      </div>
    </div>
  )
}
