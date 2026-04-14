import { Integration } from "@/lib/types/integration"

export const discordApi = "https://discord.com/api/v10"
export const discordCdn = "https://cdn.discordapp.com"
export const youtubeApi = "https://www.googleapis.com/youtube/v3"
export const redditUrl = "https://www.reddit.com"
export const twitchApi = "https://api.twitch.tv/helix"
export const twitchOAuthUrl = "https://id.twitch.tv/oauth2"
export const kickApi = "https://api.kick.com/public/v1"
export const kickOAuthUrl = "https://id.kick.com/oauth"
export const blueskyApi = "https://public.api.bsky.app/xrpc"
export const blueskyUrl = "https://bsky.app"
export const xApi = "https://api.x.com/2"
export const xUrl = "https://x.com"
export const trovoApiUrl = "https://open-api.trovo.live/openplatform"

export const url: Record<Integration, string> = {
  YouTube: "https://www.youtube.com",
  Reddit: "https://www.reddit.com",
  Twitch: "https://www.twitch.tv",
  Kick: "https://kick.com",
  X: "https://x.com",
  Bluesky: "https://bsky.app",
  Odysee: "https://odysee.com",
  Trovo: "https://trovo.live"
}

export const validDiscordNotificationChannelTypes = [
  0,  // GUILD_TEXT
  5,  // GUILD_ANNOUNCEMENT
  10, // ANNOUNCEMENT_THREAD
  11, // PUBLIC_THREAD
  12  // PRIVATE_THREAD
]
