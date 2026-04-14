import { Events } from "discord.js"
import { TypedClient } from "./client"

export interface EventHandler {
  name: Events,
  execute: (client: TypedClient, ...args: any[]) => void,
  once?: boolean
}
