import { log } from "../lib/utils/console"
import { FileHandler } from "../lib/types/handler"

const ignoredDiscordErrors = [
  50013, // Missing Permissions
  50001, // Missing Access
  10008, // Invalid Token
  50007  // Disconnected
]

interface CustomError extends Error {
  code?: number
}

const CrashHandler: FileHandler = (client) => {
  client.rest.on("rateLimited", ({ global, limit, route, timeToReset }) => {
    const info = `\nglobal: ${global}\nlimit: ${limit}\nroute: ${route}\ntime to reset: ${timeToReset}`
    log({ type: "warn", label: "Rate limited" }, info)
  })

  process.on("unhandledRejection", async (err: CustomError) => {
    if (err.code && ignoredDiscordErrors.includes(err.code)) return
    log({ type: "error", label: "Unhandled rejection" }, err)
  })

  process.on("uncaughtException", async (err: CustomError) => {
    if (err.code && ignoredDiscordErrors.includes(err.code)) return
    log({ type: "error", label: "Uncaught exception" }, err)
  })

  process.on("uncaughtExceptionMonitor", async (err: CustomError) => {
    if (err.code && ignoredDiscordErrors.includes(err.code)) return
    log({ type: "error", label: "Uncaught exception monitor" }, err)
  })
}

export default CrashHandler
