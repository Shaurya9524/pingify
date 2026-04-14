import { join } from "path"
import { readdirSync } from "fs"
import { REST, Routes } from "discord.js"
import { log } from "../lib/utils/console"
import { FileHandler } from "../lib/types/handler"
import { SlashCommand } from "../lib/types/command"

const botToken = process.env.TOKEN
const clientId = process.env.CLIENT_ID

const CommandsHandler: FileHandler = async (client) => {
  if (!botToken || !clientId) {
    log({ type: "error", label: "Commands handler error" }, "Invalid bot token or client id")
    return
  }

  const commands = []
  const commandFolders = readdirSync(join(__dirname, "../commands")).filter((file) => !file.includes("."))

  for (const folder of commandFolders) {
    const commandFiles = readdirSync(join(__dirname, `../commands/${folder}`)).filter((file) => file.endsWith(".js"))

    for (const fileName of commandFiles) {
      const module = require(`../commands/${folder}/${fileName}`)
      const command: SlashCommand = module.default

      if (!command) {
        log({ type: "error", label: "Commands handler error" }, `No default export found at the command ${fileName}`)
        continue
      }

      if (!("data" in command) || !("execute" in command)) {
        log({ type: "error", label: "Commands handler error" }, `The command at ${fileName} is missing a required "data" or "execute" property`)
        continue
      }

      client.commands.set(command.data.name, command)
      commands.push(command.data.toJSON())
    }
  }

  const rest = new REST().setToken(botToken)

  try {
    log({}, `Refreshing ${commands.length} slash commands`)
    const data = await rest.put(Routes.applicationCommands(clientId), { body: commands }) as unknown[]
    log({ type: "success" }, `Reloaded ${data.length} slash commands`)
  } catch (error) {
    log({ type: "error", label: "Slash commands deployment error" }, error)
  }
}

export default CommandsHandler
