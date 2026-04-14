import { pingifyUrl } from "../../config/constants"
import { SlashCommand } from "../../lib/types/command"
import { EmbedBuilder, MessageFlags, SlashCommandBuilder } from "discord.js"

const data = new SlashCommandBuilder()
  .setName("help")
  .setDescription("Shows the help menu")

const helpCommand: SlashCommand = {
  data,
  async execute(i) {
    const embed = new EmbedBuilder()
      .setTitle("Help menu:")
      .setDescription(`[Login](${pingifyUrl}) to Pingify's dashboard to manage your server notifcation subscriptions.
For adding new subscriptions use the </usage:1493314639885500516> command.
You can check your active subscriptions using the </subscriptions:1493295492577366126> command.`)

    await i.reply({ embeds: [embed], flags: MessageFlags.Ephemeral })
  }
}

export default helpCommand
