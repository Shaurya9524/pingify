export interface PermissionOverwrite {
  id: string
  type: number
  allow: string
  deny: string
}

export interface DiscordChannel {
  id: string
  type: number
  last_message_id: string | null
  flags: number
  guild_id: string
  name: string
  parent_id: string | null
  rate_limit_per_user: number
  topic: string | null
  position: number
  permission_overwrites: PermissionOverwrite[]
  nsfw: boolean
}
