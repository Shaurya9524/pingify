"use client"

import { Guild } from "@/lib/types/guild"
import { CSSProperties, useState } from "react"
import { useAlertContext } from "@/contexts/Alert"
import { useGuildContext } from "@/contexts/Guild"
import { getTwitchUser } from "@/lib/services/twitch"
import { subscribe } from "@/database/utils/subscribe"
import { Input, TextArea } from "@/components/ui/Input"
import { ISubscription } from "@/database/types/subscription"
import { DiscordChannelSelector } from "@/components/ui/DiscordChannelSelector"
import styles from "@/styles/main/dashboard.module.css"

export default function TwitchIntegration() {
  const { guild } = useGuildContext() as { guild: Guild } // guild availaibility is ensured in the integration layout
  const { setAlert } = useAlertContext()

  const [twitchUsername, setTwitchUsername] = useState("")
  const [discordChannelId, setDiscordChannelId] = useState("")
  const fieldStyle: CSSProperties = { display: "flex", flexDirection: "column", gap: "0.5rem" }

  async function handleSubmit() {
    setAlert({ message: "Processing your request...", duration: 20000 })

    if (!twitchUsername) {
      setAlert({ message: "Invalid twtich username", type: "danger" })
      return
    }

    const data = await getTwitchUser(twitchUsername)

    if (!data?.twitchUser || data.error) {
      setAlert({ message: "Invalid twtich streamer", type: "danger" })
      return
    }

    const subscriptionData: ISubscription = {
      integration: "Twitch",
      guildId: guild.id,
      guildName: guild.name,
      notificationChannelId: discordChannelId,
      socialId: twitchUsername,
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
          id="twitchUsername"
          type="text"
          placeholder="Twitch username E.g. shadow9524"
          autoComplete="on"
          value={twitchUsername}
          onChange={(e) => setTwitchUsername(e.target.value)}
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
