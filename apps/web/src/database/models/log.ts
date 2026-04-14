import { IGuildLog } from "../types/log"
import { model, models, Schema } from "mongoose"

const logSchema = new Schema({
  message: String,
  logType: {
    type: String,
    default: "info"
  }
}, { timestamps: true })

const guildLogSchema = new Schema<IGuildLog>({
  guildId: String,
  logs: [logSchema]
}, { timestamps: true })

export const GuildLog = models.GuildLog || model<IGuildLog>("GuildLog", guildLogSchema)
