"use client"

import { useEffect, useState } from "react"
import { Integration } from "../types/integration"
import { getSubscriptions } from "../utils/subscriptions"
import { SubscriptionDocument } from "@/database/types/subscription"

export function useSubscriptions(guildIds: string[], integration?: Integration) {
  const [subscriptions, setSubscriptions] = useState<SubscriptionDocument[]>()
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    setLoading(true)

    if (guildIds.length === 0) {
      setLoading(false)
      setErrorMessage("Provide at least one server id")
      return
    }

    getSubscriptions(guildIds, integration).then(({ error, subscriptions }) => {
      setLoading(false)

      if (error) {
        setErrorMessage(error)
        return
      }

      if (subscriptions) {
        setSubscriptions(subscriptions)
        return
      }

      setErrorMessage("An error occured while fetching the subscriptions")
    })
  }, [guildIds, integration])

  function removeSubscription(id: string) {
    setSubscriptions((prev) => prev?.filter((sub) => sub._id.toString() !== id))
  }

  return { subscriptions, loading, errorMessage, removeSubscription }
}
