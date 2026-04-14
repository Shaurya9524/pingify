"use client"

import { Guild } from "@/lib/types/guild"
import { getXUser } from "@/lib/services/x"
import { CSSProperties, useState } from "react"
import { useAlertContext } from "@/contexts/Alert"
import { useGuildContext } from "@/contexts/Guild"
import { subscribe } from "@/database/utils/subscribe"
import { Input, TextArea } from "@/components/ui/Input"
import { ISubscription } from "@/database/types/subscription"
import { DiscordChannelSelector } from "@/components/ui/DiscordChannelSelector"
import styles from "@/styles/main/dashboard.module.css"

export default function XIntegration() {
  const { guild } = useGuildContext() as { guild: Guild } // guild availaibility is ensured in the integration layout
  const { setAlert } = useAlertContext()

  const [username, setUsername] = useState("")
  const [discordChannelId, setDiscordChannelId] = useState("")
  const fieldStyle: CSSProperties = { display: "flex", flexDirection: "column", gap: "0.5rem" }

  async function handleSubmit() {
    setAlert({ message: "Processing your request...", duration: 20000 })

    if (!username) {
      setAlert({ message: "Invalid username", type: "danger" })
      return
    }

    const data = await getXUser(username)

    if (!data?.xUser || data.error) {
      setAlert({ message: "Invalid user", type: "danger" })
      return
    }

    const subscriptionData: ISubscription = {
      integration: "X",
      guildId: guild.id,
      guildName: guild.name,
      notificationChannelId: discordChannelId,
      socialId: username,
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
          id="username"
          type="text"
          placeholder="Username E.g. shadow9524"
          autoComplete="on"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <DiscordChannelSelector guildId={guild.id} setDiscordChannelId={setDiscordChannelId} />
      <div style={fieldStyle}>
        <div>Enter the notification message for new posts:</div>
        <TextArea
          id="upload-message"
          placeholder="{username} just posted: {post_title}"
          style={{ minHeight: 70, maxHeight: 200, height: "max-content" }}
        />
      </div>
      <button className={styles.submitBtn} onClick={handleSubmit}>Add notification</button>
    </div>
  )
}
