import { model, models, Schema } from "mongoose"
import { ISubscription } from "../types/subscription"

const subscriptionSchema = new Schema<ISubscription>({
  integration: String,
  socialId: String,
  guildId: String,
  guildName: String,
  notificationChannelId: String,
  notifiedPostId: String,
  notifiedAt: {
    type: Date,
    default: () => new Date()
  },
  status: {
    type: String,
    default: "Active"
  },
  uploadMessage: {
    type: String,
    default: function (this: ISubscription) {
      switch (this.integration) {
        case "YouTube":
          return "{social_name} just uploaded a new video: {post_title}"
        case "Reddit":
          return "r/{social_name} just posted: {post_title}"
        case "Twitch":
          return "{social_name} just went live: {post_title}"
        case "Kick":
          return "{social_name} just went live: {post_title}"
        default:
          return "{social_name} just posted: {post_title}"
      }
    }
  }
}, { timestamps: true })

subscriptionSchema.index({ guildId: 1, integration: 1 })

subscriptionSchema.pre("save", function (next) {
  if (this.isModified("notifiedPostId")) {
    this.notifiedAt = new Date()
  }

  next()
})

const Subscription = models.Subscription || model<ISubscription>("Subscription", subscriptionSchema)

export default Subscription
