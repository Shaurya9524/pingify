import { pingifyUrl } from "../../config/constants"
import { SlashCommand } from "../../lib/types/command"
import { EmbedBuilder, MessageFlags, SlashCommandBuilder } from "discord.js"

const data = new SlashCommandBuilder()
  .setName("usage")
  .setDescription("Read the manual for using the bot")

const usageCommand: SlashCommand = {
  data,
  async execute(i) {
    const embed = new EmbedBuilder()
      .setTitle("Usage:")
      .setDescription(`1. [Login](${pingifyUrl}) to Pingify's dashboard
2. Select the social integration (E.g. YouTube)
3. Enter the social id and select the discord channel for receiving notifications
4. You're all set up to receive the latest updates!`)

    await i.reply({ embeds: [embed], flags: MessageFlags.Ephemeral })
  }
}

export default usageCommand
