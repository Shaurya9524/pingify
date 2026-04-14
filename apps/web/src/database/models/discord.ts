import { model, models, Schema } from "mongoose"
import { IDiscordAuthToken } from "../types/discord"

const discordAuthTokenSchema = new Schema<IDiscordAuthToken>({
  userId: String,
  accessToken: String
}, { timestamps: true })

const DiscordAuthToken = models.DiscordAuthToken || model<IDiscordAuthToken>("DiscordAuthToken", discordAuthTokenSchema)
export default DiscordAuthToken
