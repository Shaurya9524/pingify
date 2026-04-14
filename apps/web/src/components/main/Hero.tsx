"use client"

import Link from "next/link"
import { TypingCarousel } from "../ui/Typing"
import { useEffect, useState } from "react"
import { useLoggedIn } from "@/lib/hooks/useLoggedIn"
import { signInWithDiscord } from "@/lib/auth/discord"
import { useBotGuilds } from "@/lib/hooks/useBotGuilds"
import { DashboardIcon, DiscordIcon, OnlineIcon } from "../ui/Icons"
import styles from "@/styles/main/hero.module.css"

export default function Hero() {
  return (
    <div className={styles.hero}>
      <Header />
      <BotInfo />
      <CTAButtons />
    </div>
  )
}

function Header() {
  return <>
    <div className={styles.tagline}>
      From Everywhere to Your <span style={{ color: "var(--color-blurple)" }}>Discord</span>
    </div>
    <div className={styles.subText}>
      Get new content from all your favorite platforms, YouTube, Reddit, X, and more
      delivered right to your Discord server so you and your community never miss a thing.
    </div>
  </>
}

function BotInfo() {
  const { guilds: botGuilds } = useBotGuilds()
  const [_, setGuildsCount] = useState<number>()
  const [lines, setLines] = useState([
    "Keeping communities connected",
    "Making every server feel alive"
  ])

  useEffect(() => {
    const guildsCount = botGuilds?.length
    if (guildsCount) {
      setLines(prev => [...prev, `Notifying ${guildsCount} servers`])
      setGuildsCount(guildsCount)
    }
  }, [botGuilds])

  return (
    <div className={`${styles.botInfo} ${styles.loaded}`}>
      <OnlineIcon size={10} />
      <TypingCarousel texts={lines} />
    </div>
  )
}

function CTAButtons() {
  const loggedIn = useLoggedIn()

  return (
    <div className={styles.ctaBtns}>
      {loggedIn ? (
        <Link href="/dashboard" className={`${styles.ctaBtn} ${styles.primaryBtn}`}>
          <DashboardIcon style={{ fontSize: 22 }} />
          <span>Dashboard</span>
        </Link>
      ) : <div className={`${styles.ctaBtn} ${styles.primaryBtn}`} onClick={signInWithDiscord}>Get Started</div>}
      <a href="/invite" target="_blank" className={`${styles.ctaBtn} ${styles.secondaryBtn}`}>
        <DiscordIcon style={{ fontSize: 22 }} />
        <span>Add to Discord</span>
      </a>
    </div>
  )
}
