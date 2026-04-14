"use client"

import { Alert } from "@/lib/types/alert"
import { createContext, ReactNode, useContext, useState } from "react"

type AlertContextType = {
  alert?: Alert,
  setAlert: (alert: Alert) => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<Alert>({ message: "" })

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  )
}

export function useAlertContext() {
  const context = useContext(AlertContext)

  if (!context) {
    throw new Error("useAlertContext must be used within a AlertProvider")
  }

  return context
}
