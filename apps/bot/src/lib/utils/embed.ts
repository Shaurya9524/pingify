import { palette } from "../../config/palette"
import { ColorResolvable, EmbedBuilder } from "discord.js"

type NotificationEmbedType = "info" | "warn" | "danger" | "success"

const embedColor: Record<NotificationEmbedType, ColorResolvable> = {
  info: palette.blue,
  success: palette.green,
  warn: palette.yellow,
  danger: palette.red
}

export function presetEmbed({ content, type = "info" }: { content: string, type?: NotificationEmbedType }) {
  return new EmbedBuilder()
    .setDescription(content)
    .setColor(embedColor[type])
}
