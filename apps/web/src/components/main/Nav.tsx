"use client"

import Link from "next/link"
import Image from "next/image"
import Profile from "../auth/Profile"
import logo from "@/assets/main/logo.png"
import ThemeToggle from "../ui/ThemeToggle"
import { HamburgerMenuIcon } from "../ui/Icons"
import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "@/lib/hooks/useMediaQuery"
import styles from "@/styles/main/nav.module.css"

export default function Nav() {
  const isMediumScreen = useMediaQuery("(max-width: 700px)")
  const isSmallScreen = useMediaQuery("(max-width: 400px)")
  const [isOpen, setIsOpen] = useState(false)
  const hamburgerMenuRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const toggleOpen = () => setIsOpen(prev => !prev)

  useEffect(() => {
    const hamburgerMenu = hamburgerMenuRef.current
    const nav = navRef.current
    if (!nav || !hamburgerMenu) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (!nav.contains(target) && !hamburgerMenu.contains(target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen])

  const Brand = () => {
    return (
      <Link href="/" className={styles.brand}>
        <Image src={logo} alt="" height={40} width={40} />
        <div>Pingify</div>
      </Link>
    )
  }

  return (
    <div className={styles.nav}>
      <Brand />
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        {!isSmallScreen && <ThemeToggle />}
        <div className={styles.navLinksWrapper} aria-expanded={isOpen} ref={navRef}>
          {isMediumScreen && <Brand />}
          <div className={styles.navLinks}>
            <a className={styles.navLink} href="/support" target="_blank">Support Server</a>
            <a className={styles.navLink} href="/invite" target="_blank">Invite</a>
            <Link className={styles.navLink} href="/docs">Docs</Link>
          </div>
          {isSmallScreen && <div style={{ alignSelf: "flex-end", marginTop: "auto", justifySelf: "flex-end" }}><ThemeToggle /></div>}
        </div>
        <Profile />
        {isMediumScreen && <div style={{ display: "grid", placeItems: "center" }} ref={hamburgerMenuRef}>
          <HamburgerMenuIcon style={{ cursor: "pointer", fontSize: 32 }} onClick={toggleOpen} />
        </div>}
      </div>
    </div>
  )
}
