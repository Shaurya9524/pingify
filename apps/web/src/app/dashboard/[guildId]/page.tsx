"use client"

import Link from "next/link"
import { useEffect, useMemo } from "react"
import { botConfig } from "@/config/bot"
import { useParams } from "next/navigation"
import BackBtn from "@/components/utils/BackBtn"
import { useGuild } from "@/lib/hooks/useGuild"
import { useGuildContext } from "@/contexts/Guild"
import AuthRoute from "@/components/auth/AuthRoute"
import { useGuildsContext } from "@/contexts/Guilds"
import { Integration } from "@/lib/types/integration"
import { useSubscriptions } from "@/lib/hooks/useSubscriptions"
import { SubscriptionDocument } from "@/database/types/subscription"
import { IntegrationIcon, integrationIcons } from "@/components/ui/Icons"
import { SubscriptionCard, SubscriptionCardSkeleton } from "@/components/ui/SubscriptionCard"
import styles from "@/styles/main/dashboard.module.css"

const { botInvite } = botConfig

export default function ServerPage() {
  const { guildId } = useParams<{ guildId: string }>()
  const { guild, loading } = useGuild(guildId)
  const { guilds, botGuilds } = useGuildsContext()
  const { setGuild } = useGuildContext()
  const isValidGuild = guilds?.some(g => g.id === guildId)
  const botInGuild = botGuilds?.some(g => g.id === guildId)

  useEffect(() => {
    if (guild) setGuild(guild)
  }, [guild, setGuild])

  return (
    <AuthRoute className={styles.dashboard}>
      <h1>Dashboard{guild && `: ${guild.name}`}</h1> <br />
      <BackBtn href="/dashboard" text="Back to Servers" />
      <br /> <br />
      {
        (!guilds || !botGuilds)
          ? <div>Fetching servers...</div>
          : loading
            ? <div>Loading...</div>
            : !isValidGuild
              ? <div>Invalid server</div>
              : botInGuild ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
                  <Integrations guildId={guildId} />
                  <SubscriptionsSection guildId={guildId} />
                </div>
              ) : (
                <Link href={`${botInvite}&guild_id=${guild?.id}&disable_guild_select=true`}>
                  Click here to invite Pingify to the server
                </Link>
              )
      }
      <br /> <br />
    </AuthRoute>
  )
}

function Integrations({ guildId }: { guildId: string }) {
  return <div>
    <h2>Integrations</h2>
    <br />
    <div className={styles.integrations}>{(
      Object.keys(integrationIcons) as Integration[]).map((integration, i) => {
        if (integration === "Odysee") return
        return <Link href={`/dashboard/${guildId}/${integration}`} className={styles.integration} key={i}>
          <IntegrationIcon integration={integration} size={45} />
          {integration}
        </Link>
      })
    }</div>
  </div>
}

function SubscriptionsSection({ guildId }: { guildId: string }) {
  const guildIds = useMemo(() => [guildId], [guildId])
  const { subscriptions, removeSubscription, loading } = useSubscriptions(guildIds)

  function renderSkeletons() {
    return Array.from({ length: 3 }).map((_, i) => (
      <SubscriptionCardSkeleton key={i} />
    ))
  }
  function renderSubscriptions(subscriptions: SubscriptionDocument[]) {
    return subscriptions.map((subscription, i) => (
      <SubscriptionCard key={i} subscription={subscription} onDeleted={removeSubscription} />
    ))
  }

  return (
    <div>
      <h2>Subscriptions</h2>
      <br />
      <div style={{ display: "flex", gap: 30, flexWrap: "wrap" }}>
        {
          loading
            ? renderSkeletons()
            : subscriptions
              ? renderSubscriptions(subscriptions)
              : "You don't have any active subscriptions"
        }
      </div>
    </div>
  )
}
