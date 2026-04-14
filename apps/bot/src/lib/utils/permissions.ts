import { TypedClient } from "../types/client"
import { Channel, TextChannel } from "discord.js"

export function canSendMessage(client: TypedClient, channel: Channel) {
  if (!channel.isTextBased()) {
    return { ok: false, reason: "Channel is not text-based" }
  }

  const textChannel = channel as TextChannel

  if ("archived" in textChannel && textChannel.archived) {
    return { ok: false, reason: "Thread is archived" }
  }

  if ("locked" in textChannel && textChannel.locked) {
    return { ok: false, reason: "Thread is locked" }
  }

  const permissions = textChannel.permissionsFor(client.user!.id)

  if (!permissions) {
    return { ok: false, reason: "Could not resolve bot permissions" }
  }

  if (!permissions.has("ViewChannel")) {
    return { ok: false, reason: "Bot cannot view the channel" }
  }

  if (!permissions.has("SendMessages")) {
    return { ok: false, reason: "Bot cannot send messages in this channel" }
  }

  if (!permissions.has("EmbedLinks")) {
    return { ok: false, reason: "Bot cannot send embeds in this channel" }
  }

  return { ok: true, reason: null }
}
