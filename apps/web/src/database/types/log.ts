import { HydratedDocument } from "mongoose"

export type LogType = "error" | "info"
export type LogAction = "created" | "added" | "unchanged" | "updated"

export interface Log {
  message: string,
  logType: LogType,
  createdAt?: Date,
  updatedAt?: Date
}

export interface IGuildLog {
  guildId: string,
  logs: Log[]
}

export type GuildLogDocument = HydratedDocument<IGuildLog>
