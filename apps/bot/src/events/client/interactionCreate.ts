import { log } from "../../lib/utils/console"
import { EventHandler } from "../../lib/types/event"
import { Events, Interaction, MessageFlags } from "discord.js"

const InteractionCreateEventHandler: EventHandler = {
  name: Events.InteractionCreate,
  async execute(client, i: Interaction) {
    // slash commands
    if (i.isChatInputCommand()) {
      const commandName = i.commandName
      const command = client.commands.get(commandName)

      if (!command) {
        log({ type: "error" }, `${commandName} command not found`)
        return
      }

      try {
        command.execute(i, client)
      } catch (error) {
        log({ type: "error" }, `An error occured while executing ${commandName} command: `, error)

        if (i.replied || i.deferred) {
          await i.followUp({ content: "There was an error while executing this command!", flags: MessageFlags.Ephemeral })
        } else {
          await i.reply({ content: "There was an error while executing this command!", flags: MessageFlags.Ephemeral })
        }
      }
    }

  }
}

export default InteractionCreateEventHandler
