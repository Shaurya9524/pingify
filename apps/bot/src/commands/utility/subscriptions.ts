import { emoji } from "../../config/emojis"
import { SlashCommand } from "../../lib/types/command"
import { Integration } from "../../lib/types/integration"
import Subscription from "../../database/models/subscription"
import { SubscriptionDocument } from "../../database/types/subscription"
import { EmbedBuilder, MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from "discord.js"

const { reply, replyContinue } = emoji

const data = new SlashCommandBuilder()
  .setName("subscriptions")
  .setDescription("Check the subscriptions you've set for the server")
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)

const subscriptionsCommand: SlashCommand = {
  data,
  async execute(i) {
    const subscriptions: SubscriptionDocument[] = await Subscription.find({ guildId: i.guildId })
    const integrationCounts = subscriptions.reduce((acc, sub) => {
      acc[sub.integration] = (acc[sub.integration] || 0) + 1
      return acc
    }, {} as Record<Integration, number>)
    const totalPlatforms = Object.values(integrationCounts).length
    const integrationsMap = Object.entries(integrationCounts).map(([integration, count], i) => {
      return `${i + 1 === totalPlatforms ? reply : replyContinue} ${integration}: ${count}\n`
    }).join("")

    const embed = new EmbedBuilder()
      .setTitle("Server subscriptions:")
      .setDescription(`Total platforms: ${totalPlatforms}
${integrationsMap}
Active subscriptions: ${subscriptions.map(s => s.status === "Active").length}`)

    await i.reply({ embeds: [embed], flags: MessageFlags.Ephemeral })
  }
}

export default subscriptionsCommand
