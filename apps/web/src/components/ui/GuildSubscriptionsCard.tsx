"use client"

import Link from "next/link"
import Image from "next/image"
import { IntegrationTag } from "./Tag"
import { lightenHex } from "@/lib/utils/color"
import { bannerColors } from "@/config/palette"
import { useGuild } from "@/lib/hooks/useGuild"
import { OnlineIcon, PlatformIcon } from "./Icons"
import { getGuildIconUrl } from "@/lib/utils/guild"
import { Integration } from "@/lib/types/integration"
import { SubscriptionDocument } from "@/database/types/subscription"
import animationStyles from "@/styles/ui/animations.module.css"
import styles from "@/styles/ui/guildSubscriptionsCard.module.css"

export function GuildSubscriptionsCard({ subscriptions, enableSkeleton }: { subscriptions: SubscriptionDocument[], enableSkeleton?: boolean }) {
  const guildId = subscriptions[0].guildId
  const guildName = subscriptions[0].guildName
  const { guild, loading } = useGuild(guildId)
  const guildIconUrl = guild ? getGuildIconUrl(guild) : ""

  const integrations = Array.from(new Set(subscriptions.map((s) => s.integration)))
  const activeCount = (subscriptions.filter(sub => sub.status === "Active")).length
  const integrationCounts = subscriptions.reduce((acc, sub) => {
    acc[sub.integration] = (acc[sub.integration] || 0) + 1
    return acc
  }, {} as Record<Integration, number>)

  return loading && enableSkeleton
    ? <GuildSubscriptionsCardSkeleton />
    : guild ? (
      <div className={styles.subscriptionCard}>
        <div className={styles.banner}>
          {guild.banner ? (
            <Image src={guild.banner} alt={`${guildName} banner`} fill className={styles.bannerImg} />
          ) : (
            <div className={styles.bannerImg} style={{ background: getRandomBannerGradient() }} />
          )}
          <div className={styles.bannerOverlay} />
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.iconWrapper}>
              <Image src={guildIconUrl} alt={guildName} width={56} height={56} className={styles.guildIcon} />
            </div>
            <div className={styles.guildName}>{guildName}</div>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat} style={{ color: "var(--color-green)" }}>
              <OnlineIcon size={8} />
              {activeCount.toLocaleString()} Active
            </div>
            <div className={styles.stat}>
              <PlatformIcon size={12} />
              {integrations.length.toLocaleString()} Platforms
            </div>
          </div>

          <div style={{ marginTop: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: "0.8rem" }}>
              <div style={{ fontSize: "0.9rem", letterSpacing: "0.03em", opacity: 0.85, fontWeight: 600, textTransform: "uppercase" }}>
                Your Subscriptions
              </div>
              <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>{activeCount} Active</div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {Object.entries(integrationCounts).map(([integration, count]) => (
                <IntegrationTag key={integration} preset={integration as Integration} count={count} />
              ))}
              <Link href={`/dashboard/${guildId}`} className={styles.addTag}>+ Add</Link>
            </div>
          </div>
        </div>
      </div>
    ) : null
}

export function GuildSubscriptionsCardSkeleton() {
  return (
    <div className={styles.subscriptionCard}>
      <div className={styles.banner}>
        <div className={`${styles.bannerImg} ${animationStyles.pulse}`} style={{ backgroundColor: "var(--color-secondary-alt)" }} />
        <div className={styles.bannerOverlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <div style={{ width: 56, height: 56, backgroundColor: "var(--color-disabled-overlay)" }} className={animationStyles.pulse} />
          </div>
          <div className={styles.guildName} />
        </div>

        <div className={styles.stats}>
          <div className={styles.stat} style={{ color: "var(--color-green)" }}>
            <OnlineIcon size={8} />
            <span className={animationStyles.pulse}>-</span> Active
          </div>
          <div className={styles.stat}>
            <PlatformIcon size={12} />
            <span className={animationStyles.pulse}>-</span> Platforms
          </div>
        </div>

        <div style={{ marginTop: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: "0.8rem" }}>
            <div style={{ fontSize: "0.9rem", letterSpacing: "0.03em", opacity: 0.85, fontWeight: 600, textTransform: "uppercase" }}>
              Your Subscriptions
            </div>
            <div style={{ fontSize: "0.8rem", opacity: 0.7 }}><span className={animationStyles.pulse}>-</span> Active</div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div className={`${styles.addTag} ${animationStyles.pulse}`} style={{ minHeight: "1.5rem", minWidth: "4rem" }} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function getRandomBannerGradient() {
  const colors = Object.values(bannerColors)
  const base = colors[Math.floor(Math.random() * colors.length)]
  return `linear-gradient(135deg, ${base}, ${lightenHex(base, 40)})`
}
