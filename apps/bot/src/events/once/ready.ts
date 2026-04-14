import { Client, Events } from "discord.js"
import { log } from "../../lib/utils/console"
import { TypedClient } from "../../lib/types/client"
import { EventHandler } from "../../lib/types/event"
import { connectDb } from "../../database/utils/connect"

// workers
import { youtubeWorker } from "../../lib/workers/youtube"
import { redditWorker } from "../../lib/workers/reddit"
import { twitchWorker } from "../../lib/workers/twitch"
import { kickWorker } from "../../lib/workers/kick"
import { blueskyWorker } from "../../lib/workers/bluesky"
import { xWorker } from "../../lib/workers/x"
import { trovoWorker } from "../../lib/workers/trovo"

const ReadyEventHandler: EventHandler = {
  name: Events.ClientReady,
  once: true,
  execute(_, readyClient: Client<true>) {
    const typedClient = readyClient as TypedClient
    log({ type: "success" }, `Ready! Logged in as ${readyClient.user.tag}`)
    connectDb()

    log({}, "Checking new social uploads every 2 minutes")

    async function workers() {
      await youtubeWorker(typedClient)
      await redditWorker(typedClient)
      await twitchWorker(typedClient)
      await kickWorker(typedClient)
      await blueskyWorker(typedClient)
      await xWorker(typedClient)
      await trovoWorker(typedClient)
    }

    setInterval(workers, 10 * 1000)
  }
}

export default ReadyEventHandler
