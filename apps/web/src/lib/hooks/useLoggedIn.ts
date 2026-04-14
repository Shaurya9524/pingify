"use client"

import { useUser } from "./useUser"
import { useEffect, useState } from "react"

export function useLoggedIn() {
  const { user } = useUser()
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    setLoggedIn(Boolean(user))
  }, [user])

  return loggedIn
}
