"use client"

import { Guild } from "@/lib/types/guild"
import { CSSProperties, useState } from "react"
import { useAlertContext } from "@/contexts/Alert"
import { useGuildContext } from "@/contexts/Guild"
import { getTrovoChannel } from "@/lib/services/trovo"
import { subscribe } from "@/database/utils/subscribe"
import { Input, TextArea } from "@/components/ui/Input"
import { ISubscription } from "@/database/types/subscription"
import { DiscordChannelSelector } from "@/components/ui/DiscordChannelSelector"
import styles from "@/styles/main/dashboard.module.css"

export default function TrovoIntegration() {
  const { guild } = useGuildContext() as { guild: Guild } // guild availaibility is ensured in the integration layout
  const { setAlert } = useAlertContext()

  const [trovoChannelUsername, setTrovoChannelUsername] = useState("")
  const [discordChannelId, setDiscordChannelId] = useState("")
  const fieldStyle: CSSProperties = { display: "flex", flexDirection: "column", gap: "0.5rem" }

  async function handleSubmit() {
    setAlert({ message: "Processing your request...", duration: 20000 })

    if (!trovoChannelUsername) {
      setAlert({ message: "Invalid Trovo channel username", type: "danger" })
      return
    }

    const data = await getTrovoChannel(trovoChannelUsername)

    if (!data?.channel || data.error) {
      setAlert({ message: "Invalid Trovo channel username", type: "danger" })
      return
    }

    const subscriptionData: ISubscription = {
      integration: "Trovo",
      guildId: guild.id,
      guildName: guild.name,
      notificationChannelId: discordChannelId,
      socialId: trovoChannelUsername,
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
          id="trovoChannelName"
          type="text"
          placeholder="Trovo channel name E.g. shadow9524"
          autoComplete="on"
          value={trovoChannelUsername}
          onChange={(e) => setTrovoChannelUsername(e.target.value)}
        />
      </div>
      <DiscordChannelSelector guildId={guild.id} setDiscordChannelId={setDiscordChannelId} />
      <div style={fieldStyle}>
        <div>Enter the notification message for new posts:</div>
        <TextArea
          id="upload-message"
          placeholder="{channel_name} just went live: {video_name}"
          style={{ minHeight: 70, maxHeight: 200, height: "max-content" }}
        />
      </div>
      <button className={styles.submitBtn} onClick={handleSubmit}>Add notification</button>
    </div>
  )
}
