import { join } from "path"
import { readdirSync } from "fs"
import { log } from "../lib/utils/console"
import { FileHandler } from "../lib/types/handler"
import { EventHandler as EventsHandler } from "../lib/types/event"

const EventsHandler: FileHandler = (client) => {
  const eventFolders = readdirSync(join(__dirname, "../events")).filter((folder) => !folder.includes("."))

  for (const fold of eventFolders) {
    const categoryFolder = readdirSync(join(__dirname, `../events/${fold}`)).filter((file) => file.endsWith(".js"))

    for (const fileName of categoryFolder) {
      const module = require(`../events/${fold}/${fileName}`)
      const event: EventsHandler = module.default

      if (!event) {
        log({ type: "error", label: "Events handler error" }, `No default export found at the event ${fileName}`)
        continue
      }

      if (!("name" in event) || !("execute" in event)) {
        log({ type: "error", label: "Events handler error" }, `The event at ${fileName} is missing a required "name" or "execute" property`)
        continue
      }

      const { name, execute, once } = event
      client[once ? "once" : "on"](name as string, (...args) => execute(client, ...args))
    }
  }
}

export default EventsHandler
