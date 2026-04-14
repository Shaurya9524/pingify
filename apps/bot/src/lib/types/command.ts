import { TypedClient } from "./client"
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

export interface SlashCommand {
  data: SlashCommandBuilder,
  execute: (interaction: ChatInputCommandInteraction, client: TypedClient) => void
}
