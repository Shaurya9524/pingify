"use client"

import { useEffect } from "react"
import { useLogs } from "@/lib/hooks/useLogs"
import AuthRoute from "@/components/auth/AuthRoute"
import styles from "@/styles/main/logs.module.css"

export default function Docs() {
  const { logs } = useLogs()

  useEffect(() => {
    console.log("logs: ", logs)
  }, [logs])

  return (
    <AuthRoute className={styles.logs}>
      Logs
    </AuthRoute>
  )
}
