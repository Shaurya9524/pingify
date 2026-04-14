"use client"

import BackBtn from "@/components/utils/BackBtn"
import { useGuildContext } from "@/contexts/Guild"
import AuthRoute from "@/components/auth/AuthRoute"
import styles from "@/styles/main/dashboard.module.css"

export default function IntegrationPageLayout({ children }: { children: React.ReactNode }) {
  const { guild } = useGuildContext()

  return (
    <AuthRoute className={styles.dashboard}>{
      !guild ? <div>Page not found</div> : (
        <>
          <h1>Dashboard{guild && `: ${guild.name}`}</h1> <br />
          <BackBtn href={`/dashboard/${guild?.id}`} text="Back to Server Integrations" />
          <br /> <br />
          <>{children}</>
        </>
      )
    }</AuthRoute>
  )
}
