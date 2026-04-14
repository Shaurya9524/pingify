"use client"

import { Guild } from "@/lib/types/guild"
import { CSSProperties, useState } from "react"
import { getKickUser } from "@/lib/services/kick"
import { useAlertContext } from "@/contexts/Alert"
import { useGuildContext } from "@/contexts/Guild"
import { subscribe } from "@/database/utils/subscribe"
import { Input, TextArea } from "@/components/ui/Input"
import { ISubscription } from "@/database/types/subscription"
import { DiscordChannelSelector } from "@/components/ui/DiscordChannelSelector"
import styles from "@/styles/main/dashboard.module.css"

export default function KickIntegration() {
  const { guild } = useGuildContext() as { guild: Guild } // guild availaibility is ensured in the integration layout
  const { setAlert } = useAlertContext()

  const [kickUsername, setKickUsername] = useState("")
  const [discordChannelId, setDiscordChannelId] = useState("")
  const fieldStyle: CSSProperties = { display: "flex", flexDirection: "column", gap: "0.5rem" }

  async function handleSubmit() {
    setAlert({ message: "Processing your request...", duration: 20000 })

    if (!kickUsername) {
      setAlert({ message: "Invalid kick username", type: "danger" })
      return
    }

    const data = await getKickUser(kickUsername)

    if (!data?.kickUser || data.error) {
      setAlert({ message: "Invalid kick streamer", type: "danger" })
      return
    }

    const subscriptionData: ISubscription = {
      integration: "Kick",
      guildId: guild.id,
      guildName: guild.name,
      notificationChannelId: discordChannelId,
      socialId: kickUsername,
      status: "Active"
    }

    const { error, message } = await subscribe(subscriptionData)
    setAlert({ message, type: error ? "danger" : "success" })
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "max-content" }}>
      <div style={fieldStyle}>
        <div>Add notification for:</div>
        <Input
          id="kickUsername"
          type="text"
          placeholder="Kick username E.g. shadow9524"
          autoComplete="on"
          value={kickUsername}
          onChange={(e) => setKickUsername(e.target.value)}
        />
      </div>
      <DiscordChannelSelector guildId={guild.id} setDiscordChannelId={setDiscordChannelId} />
      <div style={fieldStyle}>
        <div>Enter the notification message for new posts:</div>
        <TextArea
          id="upload-message"
          placeholder="{username} just went live: {stream_name}"
          style={{ minHeight: 70, maxHeight: 200, height: "max-content" }}
        />
      </div>
      <button className={styles.submitBtn} onClick={handleSubmit}>Add notification</button>
    </div>
  )
}
