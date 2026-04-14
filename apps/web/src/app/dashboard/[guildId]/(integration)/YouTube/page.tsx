"use client"

import { Guild } from "@/lib/types/guild"
import { CSSProperties, useState } from "react"
import { useAlertContext } from "@/contexts/Alert"
import { useGuildContext } from "@/contexts/Guild"
import { subscribe } from "@/database/utils/subscribe"
import { Input, TextArea } from "@/components/ui/Input"
import { getYouTubeChannel } from "@/lib/services/youtube"
import { ISubscription } from "@/database/types/subscription"
import { DiscordChannelSelector } from "@/components/ui/DiscordChannelSelector"
import styles from "@/styles/main/dashboard.module.css"

export default function YouTubeIntegration() {
  const { guild } = useGuildContext() as { guild: Guild } // guild availaibility is ensured in the integration layout
  const { setAlert } = useAlertContext()

  const [youtubeChannelId, setYoutubeChannelId] = useState("")
  const [discordChannelId, setDiscordChannelId] = useState("")
  const fieldStyle: CSSProperties = { display: "flex", flexDirection: "column", gap: "0.5rem" }

  async function handleSubmit() {
    setAlert({ message: "Processing your request...", duration: 20000 })

    if (!youtubeChannelId) {
      setAlert({ message: "Invalid YouTube channel id", type: "danger" })
      return
    }

    const data = await getYouTubeChannel(youtubeChannelId)

    if (!data?.channel || data.error) {
      setAlert({ message: "Invalid YouTube channel id", type: "danger" })
      return
    }

    const subscriptionData: ISubscription = {
      integration: "YouTube",
      guildId: guild.id,
      guildName: guild.name,
      notificationChannelId: discordChannelId,
      socialId: youtubeChannelId,
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
          id="youtubeChannelId"
          type="text"
          placeholder="YouTube channel id E.g. UCEKL6mpz-f77QD_E5yhte7A"
          autoComplete="on"
          value={youtubeChannelId}
          onChange={(e) => setYoutubeChannelId(e.target.value)}
        />
      </div>
      <DiscordChannelSelector guildId={guild.id} setDiscordChannelId={setDiscordChannelId} />
      <div style={fieldStyle}>
        <div>Enter the notification message for newly uploaded content:</div>
        <TextArea
          id="upload-message"
          placeholder="{channel_name} just uploaded a new video: {video_name}"
          style={{ minHeight: 70, maxHeight: 200, height: "max-content" }}
        />
      </div>
      <button className={styles.submitBtn} onClick={handleSubmit}>Add notification</button>
    </div>
  )
}
