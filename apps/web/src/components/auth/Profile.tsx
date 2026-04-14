"use client"

import Link from "next/link"
import Image from "next/image"
import LoginBtn from "../ui/LoginBtn"
import { signOut } from "@/lib/auth/discord"
import { useUser } from "@/lib/hooks/useUser"
import { DiscordMetadata } from "@/lib/types/user"
import { useEffect, useRef, useState } from "react"
import animationStyles from "@/styles/ui/animations.module.css"
import styles from "@/styles/auth/profile.module.css"

export default function Profile() {
  const { user, loading } = useUser()
  const userData = user?.user_metadata

  return loading
    ? <div className={`${styles.skeleton} ${animationStyles.pulse}`} />
    : user
      ? <LoggedInProfile userData={userData as DiscordMetadata} />
      : <LoginBtn />
}

function LoggedInProfile({ userData }: { userData: DiscordMetadata }) {
  const displayName = userData?.custom_claims.global_name
  const avatarUrl = userData?.avatar_url
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setOpen(prev => !prev)
  const closeMenu = () => setOpen(false)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu()
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  return (
    <div className={styles.profile} ref={menuRef}>
      <Image
        src={avatarUrl as string}
        alt={displayName as string}
        width={40}
        height={40}
        style={{ borderRadius: 999, cursor: "pointer" }}
        onClick={toggleMenu}
      />
      <div className={`${styles.menu} ${open ? styles.open : styles.closed}`}>
        <div className={`${styles.item} ${styles.disabledItem}`}>
          <span style={{ fontSize: "0.7rem" }}>Logged in as</span><br />
          <span>{displayName}</span>
        </div>
        <hr className={styles.separator} />
        <Link href="/dashboard" className={styles.item}>Dashboard</Link>
        <hr className={styles.separator} />
        <Link href="/logs" className={styles.item}>Logs</Link>
        <hr className={styles.separator} />
        <div style={{ color: "var(--color-red)" }} className={styles.item} onClick={signOut}>Logout</div>
      </div>
    </div>
  )
}
