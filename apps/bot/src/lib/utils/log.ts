import { logsConfig } from "../../config/constants"
import { GuildLog } from "../../database/models/log"
import { LogAction, LogDocument, LogType } from "../../database/types/log"

export async function upsertGuildLog(guildId: string, message: string, logType: LogType = "info"): Promise<{ action: LogAction }> {
  const guildLog = await GuildLog.findOne({ guildId }) as LogDocument

  if (!guildLog) {
    await GuildLog.create({
      guildId,
      logs: [{ message }]
    })

    return { action: "added" }
  }

  const existingMessage = guildLog.logs.find(log => log.message === message)

  if (!existingMessage) {
    guildLog.logs.push({ message, logType })
    await guildLog.save()
    return { action: "added" }
  }

  const now = Date.now()
  const lastUpdated = new Date(existingMessage.updatedAt!).getTime()
  const diffHours = (now - lastUpdated) / (1000 * 60 * 60)

  if (diffHours >= logsConfig.thresholdHours) {
    existingMessage.updatedAt = new Date()
    await guildLog.save()
    return { action: "updated" }
  }

  return { action: "unchanged" }
}
