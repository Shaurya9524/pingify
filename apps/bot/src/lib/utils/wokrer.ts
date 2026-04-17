import { TextChannel } from "discord.js"
import { PostData } from "../types/woker"
import { TypedClient } from "../types/client"
import { upsertGuildLog } from "../utils/log"
import { Integration } from "../types/integration"
import { canSendMessage } from "../utils/permissions"
import Subscription from "../../database/models/subscription"
import { SubscriptionDocument } from "../../database/types/subscription"

export async function worker(client: TypedClient, integration: Integration, fetchPost: (socialId: string) => Promise<PostData | null>) {
  const subscriptions: SubscriptionDocument[] = await Subscription.find({ integration, status: "Active" })
  const latestPosts = new Map<string, PostData>()

  for (const subscription of subscriptions) {
    const { socialId, guildId, guildName, notificationChannelId, uploadMessage, notifiedAt, notifiedPostId } = subscription
    const notificationChannel = client.channels.cache.get(notificationChannelId)

    if (!notificationChannel || !notificationChannel.isTextBased() || !notificationChannel.isSendable()) {
      const message = `Bot was unable to send reddit notification to the channel with id (${notificationChannelId}) because it is invalid, not a text channel or the discord channel was deleted`
      await upsertGuildLog(guildId, message, "error")
      continue
    }

    const latestPost = latestPosts.get(socialId) ?? await fetchPost(socialId)
    if (!latestPost) continue

    latestPosts.set(socialId, latestPost)
    const { socialName, postTitle, postId, publishedAt, url } = latestPost
    const notifiedTime = new Date(notifiedAt!)
    const publishedTime = new Date(publishedAt)

    if ((notifiedTime > publishedTime) || (notifiedPostId === postId)) continue

    const canSendMessageRes = canSendMessage(client, notificationChannel)

    if (!canSendMessageRes?.ok) {
      const message = `Bot was unable to send reddit notification to the **${(notificationChannel as TextChannel).name}** channel with id (${notificationChannelId}) in the server **${guildName}** because of missing permissions`
      await upsertGuildLog(guildId, message, "error")
      continue
    }

    const content = `${uploadMessage?.replace(/{social_name}/g, socialName).replace(/{post_title}/g, `**${postTitle}**`)}\n${url}`
    await notificationChannel.send({ content })

    subscription.notifiedPostId = postId
    await subscription.save()
  }
}
