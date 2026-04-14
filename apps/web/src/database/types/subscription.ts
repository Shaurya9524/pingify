import { HydratedDocument } from "mongoose"
import { Integration } from "../../lib/types/integration"

type Status = "Active" | "Paused"

export interface ISubscription {
  integration: Integration,
  socialId: string,
  guildId: string,
  guildName: string,
  notificationChannelId: string,
  status: Status,
  notifiedPostId?: string,
  notifiedAt?: Date,
  uploadMessage?: string,
  createdAt?: Date,
  updatedAt?: Date
}

export type SubscriptionDocument = HydratedDocument<ISubscription>
