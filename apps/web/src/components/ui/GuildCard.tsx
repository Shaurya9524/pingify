import Image from "next/image"
import { Guild } from "@/lib/types/guild"
import { getGuildIconUrl } from "@/lib/utils/guild"
import styles from "@/styles/ui/guildCard.module.css"
import animationStyles from "@/styles/ui/animations.module.css"

export function GuildCard({ guild, grayscale }: { guild: Guild, grayscale?: boolean }) {
  return (
    <div className={styles.guildCard}>
      <div style={{ filter: grayscale ? "grayscale(1)" : undefined, display: "grid", placeItems: "center" }}>
        <GuildIcon guild={guild} />
      </div>
      <div className={styles.guildName}>{guild.name}</div>
    </div>
  )
}

function GuildIcon({ guild }: { guild: Guild }) {
  const iconUrl = getGuildIconUrl(guild)
  return iconUrl
    ? <Image src={iconUrl} alt={guild.name} width={130} height={130} className={styles.guildIcon} priority />
    : <div style={{ backgroundColor: "var(--color-blurple)", fontSize: "4rem" }} className={styles.guildIcon}>{guild.name.charAt(0)}</div>
}

export function GuildCardSkeleton() {
  return (
    <div className={`${styles.guildCard} ${styles.skeleton}`}>
      <div
        className={`${styles.guildIcon} ${animationStyles.pulse}`}
        style={{ backgroundColor: "var(--color-secondary)" }}
      />
      <div
        className={`${styles.guildName} ${animationStyles.pulse}`}
        style={{ height: "1rem", backgroundColor: "var(--color-secondary)", borderRadius: 4 }}
      />
    </div>
  )
}
