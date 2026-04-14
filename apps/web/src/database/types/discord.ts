import { HydratedDocument } from "mongoose"

export interface IDiscordAuthToken {
  userId: string,
  accessToken: string,
  createdAt: Date
}

export type DiscordAuthTokenDocument = HydratedDocument<IDiscordAuthToken>
