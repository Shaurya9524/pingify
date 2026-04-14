"use client"

import { Guild } from "@/lib/types/guild"
import { CSSProperties, useState } from "react"
import { useAlertContext } from "@/contexts/Alert"
import { useGuildContext } from "@/contexts/Guild"
import { subscribe } from "@/database/utils/subscribe"
import { getBlueskyUser } from "@/lib/services/bluesky"
import { Input, TextArea } from "@/components/ui/Input"
import { ISubscription } from "@/database/types/subscription"
import { DiscordChannelSelector } from "@/components/ui/DiscordChannelSelector"
import styles from "@/styles/main/dashboard.module.css"

export default function BlueskyIntegration() {
  const { guild } = useGuildContext() as { guild: Guild } // guild availaibility is ensured in the integration layout
  const { setAlert } = useAlertContext()

  const [blueskyHandle, setBlueskyHandle] = useState("")
  const [discordChannelId, setDiscordChannelId] = useState("")
  const fieldStyle: CSSProperties = { display: "flex", flexDirection: "column", gap: "0.5rem" }

  async function handleSubmit() {
    setAlert({ message: "Processing your request...", duration: 20000 })

    if (!blueskyHandle) {
      console.log("here")
      setAlert({ message: "Invalid bluesky handle", type: "danger" })
      return
    }

    const data = await getBlueskyUser(blueskyHandle)

    if (!data?.blueskyUser || data.error) {
      setAlert({ message: "Invalid bluesky user", type: "danger" })
      return
    }

    const subscriptionData: ISubscription = {
      integration: "Bluesky",
      guildId: guild.id,
      guildName: guild.name,
      notificationChannelId: discordChannelId,
      socialId: blueskyHandle,
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
          id="blueskyHandle"
          type="text"
          placeholder="Bluesky handle E.g. shadow9524.bsky.social"
          autoComplete="on"
          value={blueskyHandle}
          onChange={(e) => setBlueskyHandle(e.target.value)}
        />
      </div>
      <DiscordChannelSelector guildId={guild.id} setDiscordChannelId={setDiscordChannelId} />
      <div style={fieldStyle}>
        <div>Enter the notification message for new posts:</div>
        <TextArea
          id="upload-message"
          placeholder="{bluesky_handle} just posted: {post_title}"
          style={{ minHeight: 70, maxHeight: 200, height: "max-content" }}
        />
      </div>
      <button className={styles.submitBtn} onClick={handleSubmit}>Add notification</button>
    </div>
  )
}
