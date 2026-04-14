"use client"

import { SubscriptionDocument } from "@/database/types/subscription"
import { createContext, ReactNode, useContext, useState } from "react"

type SubscriptionsContextType = {
  subscriptions?: SubscriptionDocument[],
  setSubscriptions: (subscriptions: SubscriptionDocument[]) => void
}

const SubscriptionsContext = createContext<SubscriptionsContextType | undefined>(undefined)

export function SubscriptionsProvider({ children }: { children: ReactNode }) {
  const [subscriptions, setSubscriptions] = useState<SubscriptionDocument[] | undefined>()

  return (
    <SubscriptionsContext.Provider value={{ subscriptions, setSubscriptions }}>
      {children}
    </SubscriptionsContext.Provider>
  )
}

export function useSubscriptionsContext() {
  const context = useContext(SubscriptionsContext)

  if (!context) {
    throw new Error("useSubscriptionsContext must be used within a SubscriptionsProvider")
  }

  return context
}
