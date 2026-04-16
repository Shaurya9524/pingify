import { presetEmbed } from "../../lib/utils/embed"
import { SlashCommand } from "../../lib/types/command"
import { MessageFlags, SlashCommandBuilder } from "discord.js"

const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Check the bot's latency")

const pingCommand: SlashCommand = {
  data,
  async execute(i) {
    const { resource } = await i.reply({ content: "Pinging...", withResponse: true, flags: MessageFlags.Ephemeral })
    const latency = resource!.message!.createdTimestamp - i.createdTimestamp
    const gateway = i.client.ws.ping
    const content = `**Latency:** ${latency}ms\n**Gateway ping**: ${gateway}ms`

    await i.editReply({
      content: null,
      embeds: [presetEmbed({ content })]
    })
  }
}

export default pingCommand
