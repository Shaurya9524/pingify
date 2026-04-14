import { discordCdn } from "@/config/constants"

export function discordIconUrl(serverId: string, iconId: string) {
  return `${discordCdn}/icons/${serverId}/${iconId}.png`
}
