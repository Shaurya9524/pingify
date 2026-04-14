"use client"

import Link from "next/link"
import { BackIcon } from "../ui/Icons"
import styles from "@/styles/main/dashboard.module.css"

export default function BackBtn({ href, text = "Back" }: { href: string, text?: string }) {
  return (
    <Link href={href} className={styles.back}>
      <BackIcon size={32} />
      <span>{text}</span>
    </Link>
  )
}
