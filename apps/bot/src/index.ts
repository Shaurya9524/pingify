import { join } from "path"
import { config } from "dotenv"
import { readdirSync } from "fs"
import { log } from "./lib/utils/console"
import { GatewayIntentBits } from "discord.js"
import { TypedClient } from "./lib/types/client"
import { FileHandler } from "./lib/types/handler"

config()

const botToken = process.env.TOKEN

const client = new TypedClient({ intents: [GatewayIntentBits.Guilds] })

log({}, "Bot is starting")

const handlers = readdirSync(join(__dirname, "./handlers"))
for (const fileName of handlers) {
  try {
    const module = require(`./handlers/${fileName}`)
    const handler: FileHandler = module.default

    if (!handler) {
      log({ type: "error", label: "Files handler error" }, `No default export found at the handler: ${fileName}`)
      continue
    }

    if (typeof handler !== "function") {
      log({ type: "error", label: "Files handler error" }, `File handler at ${fileName} is not a function`)
      continue
    }

    handler(client)
  } catch (err) {
    log({ type: "error", label: "Files handler error" }, `Failed to load handler ${fileName}:`, err)
  }
}

client.login(botToken).catch((err) => {
  log({ type: "error", label: "Login error" }, err)
})
