import { XUser } from "./x"
import { Guild } from "./guild"
import { KickUser } from "./kick"
import { Subreddit } from "./reddit"
import { TwitchUser } from "./twitch"
import { TrovoChannel } from "./trovo"
import { BlueskyUser } from "./bluesky"
import { YouTubeChannel } from "./youtube"
import { DiscordChannel } from "./channel"
import { Integration } from "./integration"
import { IGuildLog } from "@/database/types/log"
import { ISubscription, SubscriptionDocument } from "@/database/types/subscription"

// Discord auth
export interface GetTokenReq {
  userId: string
}

export interface GetTokenRes {
  success: boolean,
  accessToken?: string
}

export interface SaveTokenReq {
  userId: string,
  accessToken: string
}

export interface SaveTokenRes {
  saved: boolean,
  message: string
}

// Discord guild
export interface GetGuildsRes {
  guilds: Guild[] | null,
  error: string | null
}

export interface GetGuildReq {
  guildId: string
}

export interface GetGuildRes {
  guild: Guild | null,
  error: string | null
}

export interface GetGuildChannelsReq {
  guildId: string
}

export interface GetGuildChannelsRes {
  channels?: DiscordChannel[],
  error?: string
}

export interface GetChannelReq {
  channelId: string
}

export interface GetChannelRes {
  channel: DiscordChannel | null
  error: string | null
}

// Subscriptions
export interface SubscribeReq {
  subscriptionData: ISubscription
}

export interface SubscribeRes {
  message: string,
  subscribed?: boolean,
  error?: boolean
}

export interface GetSubscriptionsReq {
  guildIds: string[],
  social?: Integration
}

export interface GetSubscriptionsRes {
  subscriptions?: SubscriptionDocument[],
  error?: string
}

export interface UnsubscribeReq {
  subscriptionDocId: string
}

export interface UnsubscribeRes {
  message: string,
  unsubscribed?: boolean,
  error?: boolean
}

export interface UpdateSubscriptionReq {
  subscriptionId: string
  updates: Partial<ISubscription>
}

export interface UpdateSubscriptionRes {
  subscription?: SubscriptionDocument
  error?: string
}

// Logs
export interface GetLogsReq {
  guildIds: string[]
}

export interface GetLogsRes {
  logs?: IGuildLog[],
  error?: string
}

// Socials
export interface GetYouTubeChannelReq {
  channelId: string
}

export interface GetYouTubeChannelRes {
  channel?: YouTubeChannel,
  error?: string
}

export interface GetSubredditReq {
  subredditName: string
}

export interface GetSubredditRes {
  subreddit?: Subreddit,
  error?: string
}

export interface GetTwitchUserReq {
  username: string
}

export interface GetTwitchUserRes {
  twitchUser?: TwitchUser
  error?: string
}

export interface GetKickUserReq {
  username: string
}

export interface GetKickUserRes {
  kickUser?: KickUser
  error?: string
}

export interface GetBlueskyUserReq {
  handle: string
}

export interface GetBlueskyUserRes {
  blueskyUser?: BlueskyUser
  error?: string
}

export interface GetXUserReq {
  username: string
}

export interface GetXUserRes {
  xUser?: XUser
  error?: string
}

export interface GetTrovoChannelReq {
  username: string
}

export interface GetTrovoChannelRes {
  channel?: TrovoChannel
  error?: string
}