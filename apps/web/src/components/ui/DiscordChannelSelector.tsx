"use client"

import { Dropdown } from "./Dropdown"
import { useEffect, useState } from "react"
import { DiscordChannel } from "@/lib/types/channel"
import { getGuildChannels } from "@/lib/utils/channel"
import { validDiscordNotificationChannelTypes } from "@/config/constants"

interface DiscordNotificationChannelSelectorProps {
  guildId: string,
  setDiscordChannelId: (channelId: string) => void
}

export function DiscordChannelSelector({ guildId, setDiscordChannelId }: DiscordNotificationChannelSelectorProps) {
  const [discordChannels, setDiscordChannels] = useState<DiscordChannel[]>([])
  const [notificationChannel, setNotificationChannel] = useState("")
  const [channelsAvailable, setChannelsAvailable] = useState(true)

  useEffect(() => {
    async function getDiscordChannels() {
      const { channels } = await getGuildChannels(guildId)
      if (channels && channels.length > 0) {
        setNotificationChannel(`#${channels[0].name}`)
        setDiscordChannels(channels)
      } else {
        setChannelsAvailable(false)
      }
    }

    getDiscordChannels()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const newDiscordChannelId = discordChannels.find(channel => channel.name === notificationChannel.slice(1))?.id || ""
    setDiscordChannelId(newDiscordChannelId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discordChannels, notificationChannel])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <div>Select the notifications channel:</div>
      <Dropdown
        items={discordChannels.filter(channel => validDiscordNotificationChannelTypes.includes(channel.type)).map(channel => `#${channel.name}`)}
        selectedItem={channelsAvailable ? notificationChannel : "No channels available"}
        setSelectedItem={setNotificationChannel}
        disabled={!channelsAvailable}
      />
    </div>
  )
}
