import { SlashCommand } from "./command"
import { Client, Collection } from "discord.js"

export class TypedClient extends Client {
  commands: Collection<string, SlashCommand>

  constructor(options: any) {
    super(options)
    this.commands = new Collection()
  }
}
